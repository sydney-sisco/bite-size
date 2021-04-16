const fastifyPlugin = require('fastify-plugin')

async function recipeQueries (fastify) {
  const { pg } = fastify

  fastify.decorate('recipeQuery', {
    getEmojis: async (recipeId) => {
      return pg.query(`
        SELECT e.*, count(u.*) AS count FROM emojis e
        LEFT JOIN user_emoji_reactions u ON e.id = u.emoji_id
        AND u.recipe_id = $1
        GROUP BY e.id;
      `, [recipeId])
    },
    getAll: async () => {
      return pg.query(`
        SELECT r.*, u.username, count(f.*) AS favourites FROM recipes r
        JOIN users u ON u.id = r.user_id
        JOIN favourites f ON r.id = f.recipe_id
        GROUP BY r.id, u.username
        ORDER BY r.id
      `) 
    },
    postNewRecipe: async (newRecipe) => {
      let {
        user_id,
        title,
        difficulty_id,
        duration,
        image_url,
        servings,
        description,
        instructionSteps,
        ingredientList,
        unitOfMeasure,
        quantity
      } = newRecipe
    
      const { rows: recipe } = await pg.transact(async client => {
        return client.query(`
            INSERT INTO recipes (user_id, title, difficulty_id, duration, image_url, servings, description)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
          `, [user_id, title, difficulty_id, duration, image_url, servings, description]
        )
      })
      const recipeId = recipe[0].id;

      instructionSteps = instructionSteps.split('\n').map((e, i) => [i, e]);

      const instructions = await pg.transact(async client => {
        const newInstructions = []
        for (const [index, step] of instructionSteps) {
          if (step) {
            const { rows } = await client.query(`
              INSERT INTO instructions (instruction, step, recipe_id)
              VALUES ($1, $2, $3)
              RETURNING *;
            `, [step, (index + 1), recipeId]
            )
            newInstructions.push(rows[0])
          }
        }
        return newInstructions
      })
      const processedIngredients = processIngredients(ingredientList);
    
       const ingredients = await pg.transact(async client => {
        const newIngredients = []
        for (const ingredient of processedIngredients) {
          if (ingredient) {
            const { rows } = await client.query(`
              INSERT INTO ingredients (name) 
              VALUES ($1)
              RETURNING *;
            `, [ingredient.ingredient])
    
            const ingredientId = rows[0].id
    
            const { rows: newQuantity } = await client.query(`
              INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) 
              VALUES ($1, $2, $3, $4)
              RETURNING *;
            `, [recipeId, ingredientId, ingredient.quantity, ingredient.unitOfMeasure])

            newIngredients.push({
              ingredient: rows[0],
              quantityId: newQuantity[0].id,
              quantity: newQuantity.quantity,
              unitOfMeasureId: newQuantity.unitOfMeasure_id
            })
          }
        }
        return newIngredients
      })
      return { recipe: recipe[0], instructions, ingredients }
    },

    editRecipe: async (editRecipe, recipeID) => {
      let {
        userId,
        title,
        difficulty_id,
        duration,
        image_url,
        servings,
        description,
        instructionSteps,
        ingredientList,
        unitOfMeasure,
        quantity
      } = editRecipe
    
      const { rows: recipe } = await pg.transact(async client => {
        return client.query(`
            UPDATE recipes 
            SET user_id = $1, title = $2, difficulty_id = $3, duration = $4, image_url = $5, servings = $6, description = $7
            WHERE id = $8
            RETURNING *;
          `, [userId, title, difficulty_id, duration, image_url, servings, description, recipeID]
        )
      })

      // delete any existing instructions for recipe
      await pg.transact(async client => {
        return client.query(`
          DELETE FROM instructions 
          WHERE recipe_id = $1;
        `, [recipeID]
        );
      });

      instructionSteps = instructionSteps.split('\n').map((e, i) => [i, e]);
      
      const instructions = await pg.transact(async client => {
        const newInstructions = []
        for (const [index, step] of instructionSteps) {
          if (step) {
            const { rows } = await client.query(`
              INSERT INTO instructions (instruction, step, recipe_id)
              VALUES ($1, $2, $3)
              RETURNING *;
            `, [step, (index + 1), recipeID]
            )
            newInstructions.push(rows[0])
          }
        }
        return newInstructions
      })

      // delete any recipe_ingredients for recipe
      // ingredients will cascade
      await pg.transact(async client => {
        return client.query(`
          DELETE FROM recipe_ingredients 
          WHERE recipe_id = $1;
        `, [recipeID]
        );
      });
      
      const processedIngredients = processIngredients(ingredientList);
    
      const ingredients = await pg.transact(async client => {
        const newIngredients = []
        for (const ingredient of processedIngredients) {
          if (ingredient) {
            const { rows } = await client.query(`
              INSERT INTO ingredients (name) 
              VALUES ($1)
              RETURNING *;
            `, [ingredient.ingredient])
    
            const ingredientId = rows[0].id
    
            const { rows: newQuantity } = await client.query(`
              INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) 
              VALUES ($1, $2, $3, $4)
              RETURNING *;
            `, [recipeID, ingredientId, ingredient.quantity, ingredient.unitOfMeasure])

            newIngredients.push({
              ingredient: rows[0],
              quantityId: newQuantity[0].id,
              quantity: newQuantity.quantity,
              unitOfMeasureId: newQuantity.unitOfMeasure_id
            })
          }
        }
        return newIngredients
      })
      // return { recipe: recipe[0], instructions, ingredients }
      return { recipe: recipe[0] }
    }
    
  })
}

// hopefully converts a unit of measure: "cups" into an index value
// this index value should match the cooresponding id in the
// units_of_measure database table
const findUnitOfMeasureID = unit => {
  const units = [, // leave a blank space because the db starts at id:1
    'each',
    'cup',
    'ounce',
    'gallon',
    'gram',
    'kilogram',
    'liter',
    'milliliter',
    'pint',
    'pound',
    'quart',
    'tablespoon',
    'teaspoon',
    'deciliter',
    'dL',
    'fluid ounce',
    'gal',
    'g',
    'kg',
    'L',
    'mL',
    'oz',
    'pt',
    'lb',
    'qt',
    'tbsp',
    'tsp'
  ];

  console.log('unit:', unit);

  // if unit ends with an 's', remove it
  if (unit.slice(unit.length - 1) === 's') {
    unit = unit.slice(0, -1);
  }

  // look for unit in the array
  unitsIndex = units.indexOf(unit); // returns -1 if not found

  console.log('unit:', unit, 'index:', unitsIndex);
  
  // if not found, return 1 (indicating 'each')
  return unitsIndex > 0 ? unitsIndex : 1
}

const processIngredients = ingredients => {

  // console.log(str);

  // split the string into an array based on new-line character
  let ingArr = ingredients.split('\n');
  ingArr = ingArr.filter(word => word.length > 0);

  const details = ingArr.map(e => {
    return e.trim().split(' '); // split each line into an array of words
  }).map(e => { // map each line into an array of [quantity, unit, ingredient]
    // let quantity = 1;
    // let unit = 'each';
    // let ingredient = '';

    console.log(e);

    const obj = {
      quantity: 1,
      unitOfMeasure: 'each', // needs to be an ID from `select * from units_of_measure;`
      ingredient: ''
    }
    
    console.log('detail:', e);
    
    if (e.length === 1) { // single word
      obj.ingredient = e[0];
      // return [quantity, unit, ingredient];
      obj.unitOfMeasure = findUnitOfMeasureID(obj.unitOfMeasure);
      console.log(obj);
      return obj;
    }

    if (e.length > 1) {

      // if the first value isn't a number, use 1
      if (!parseInt(e[0])) {
        obj.quantity = 1
        obj.ingredient = e.flat().join(' ');
        obj.unitOfMeasure = findUnitOfMeasureID(obj.unitOfMeasure);
        console.log(obj);
        return obj;
      }

      obj.quantity = parseInt(e[0]);

      const ofIndex = e.findIndex(e => e === 'of');

      if (ofIndex === -1) { // 'of' not found
        obj.ingredient = e.slice(1, e.length).flat().join(' ');
      }

      if ( ofIndex > 0) { // split array based on location of 'of'
        obj.unitOfMeasure = e.slice(1, ofIndex).flat().join(' ');
        obj.ingredient = e.slice(ofIndex + 1, e.length).flat().join(' ');
      }

      obj.unitOfMeasure = findUnitOfMeasureID(obj.unitOfMeasure);
      // obj.unitOfMeasure = 1; // hack it in for now
      return obj;
    }
    console.log('returning e???', e);
    return e; // shouldn't get here
  })
  return details;
}

module.exports = fastifyPlugin(recipeQueries, {
  name: 'recipe-queries',
  decorators: {
    fastify: ['pg']
  },
  dependencies: [
    'fastify-postgres'
  ]
})