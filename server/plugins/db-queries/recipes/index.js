const fastifyPlugin = require('fastify-plugin')

async function recipeQueries(fastify) {
  const { pg: { query, transact } } = fastify

  fastify.decorate('recipeQuery', {
    // getUserEmojiReactions: async (userId, recipeId) => {
    //   return query(`
    //     SELECT e.id,
    //     CASE 
    //       WHEN u.id IS NULL THEN 0
    //       ELSE 1
    //     END AS selected
    //     FROM emojis e
    //     LEFT JOIN user_emoji_reactions u ON e.id = u.emoji_id AND u.user_id = $1 AND u.recipe_id = $2
    //     ORDER BY e.id;
    //     `, [userId, recipeId]
    //   )
    // },

    getEmojis: async (recipeId) => {
      return query(`
        SELECT e.*, count(u.*) AS count FROM emojis e
        LEFT JOIN user_emoji_reactions u ON e.id = u.emoji_id
        AND u.recipe_id = $1
        GROUP BY e.id
        ORDER BY e.id;
      `, [recipeId])
    },
    getAll: async () => {
      return query(`
        SELECT r.*, u.username, count(f.*) AS favourites FROM recipes r
        JOIN users u ON u.id = r.user_id
        JOIN favourites f ON r.id = f.recipe_id
        GROUP BY r.id, u.username
        ORDER BY r.id
      `)
    },

    getRecipes: async () => {
      return query(`
        SELECT r.*, u.username, count(f.*) AS favourites, string_agg(i.name, ',') AS ingredients, string_agg(t.name, ',') AS tags FROM recipes r
        JOIN users u ON u.id = r.user_id
        LEFT JOIN favourites f ON r.id = f.recipe_id
        LEFT JOIN recipe_ingredients ri ON ri.recipe_id = r.id
        LEFT JOIN ingredients i ON i.id = ri.ingredient_id
        LEFT JOIN recipe_tags rt ON rt.recipe_id = r.id
        LEFT JOIN tags t ON rt.tag = t.id
        GROUP BY r.id, u.username
        ORDER BY r.id
        `
      )
    },

    // getRecipe: async (id) => {
    //   return query(`
    //     SELECT r.*, d.name AS difficulty, COUNT(f.*) as favourite_count FROM recipes
    //     LEFT JOIN difficulties d ON d.id = r.difficulty_id
    //     LEFT JOIN favourites f ON f.recipe_id = r.id
    //     WHERE r.id=$1
    //     GROUP BY r.id, d.name
    //     `, [id]
    //   )
    // },

    // getInstructions: async (id) => {
    //   return query(`
    //     SELECT * FROM instructions
    //     WHERE recipe_id = $1
    //     ORDER BY step`, [id]
    //   )
    // },

    // getIngredients: async (id) => {
    //   return query(`
    //     SELECT * FROM recipe_ingredients ri
    //     LEFT JOIN ingredients i ON i.id = ri.ingredient_id
    //     LEFT JOIN units_of_measure u ON u.id = ri.unit_of_measure_id
    //     WHERE ri.recipe_id = $1;`, [id]
    //   )
    // },

    getTags: async (id) => {
      return query(`
        SELECT * FROM recipe_tags
        LEFT JOIN tags ON tags.id = recipe_tags.tag
        WHERE recipe_tags.recipe_id = $1;
        `, [id]
      )
    },

    getRecipeDetails: async (recipeId, userId) => {

      const { rows: recipe } = await query(`
        SELECT r.*, d.name AS difficulty, COUNT(f.*) as favourite_count FROM recipes r
        LEFT JOIN difficulties d ON d.id = r.difficulty_id
        LEFT JOIN favourites f ON f.recipe_id = r.id
        WHERE r.id=$1
        GROUP BY r.id, d.name
        `, [recipeId]
      )

      const { rows: instructions } = await query(`
        SELECT * FROM instructions
        WHERE recipe_id = $1
        ORDER BY step`, [recipeId]
      )

      const { rows: ingredients } = await query(`
        SELECT * FROM recipe_ingredients ri
        LEFT JOIN ingredients i ON i.id = ri.ingredient_id
        LEFT JOIN units_of_measure u ON u.id = ri.unit_of_measure_id
        WHERE ri.recipe_id = $1;`, [recipeId]
      )

      const { rows: emojiReactions } = await query(`
        SELECT e.*, count(u.*) AS count FROM emojis e
        LEFT JOIN user_emoji_reactions u ON e.id = u.emoji_id
          AND u.recipe_id = $1
        GROUP BY e.id
        ORDER BY e.id;`, [recipeId]
      )

      const { rows: tags } = await query(`
        SELECT * FROM recipe_tags
        LEFT JOIN tags ON tags.id = recipe_tags.tag
        WHERE recipe_tags.recipe_id = $1;
        `, [recipeId]
      )

      // let userEmojiReactions

      if (userId) {
        // recipeDetails.recipe[0].userFavourite = await this.hasUserFavourited(userId, recipeId);
        // const userEmojiReactions = await this.getUserEmojiReactions(userId, recipeId);
        const { rows: userFavourite } = await query(`
          SELECT * FROM favourites    
          WHERE user_id = $1
          AND recipe_id = $2;
          `, [userId, recipeId]
        )
        recipe[0].userFavourite = userFavourite

        const { rows: userEmojiReactions } = await query(`
          SELECT e.id,
          CASE 
            WHEN u.id IS NULL THEN 0
            ELSE 1
          END AS selected
          FROM emojis e
          LEFT JOIN user_emoji_reactions u ON e.id = u.emoji_id AND u.user_id = $1 AND u.recipe_id = $2
          ORDER BY e.id;
          `, [userId, recipeId]
        )

        emojiReactions.map((emojiReaction, index) => {
          emojiReaction.selected = userEmojiReactions[index].selected;
          return emojiReaction;
        })
      }
      return {
        recipe,
        instructions,
        ingredients,
        emojiReactions,
        tags,
      };
    },

    // hasUserFavourited: async (userId, recipeId) => {
    //   return query(`
    //     SELECT * FROM favourites    
    //     WHERE user_id = $1
    //     AND recipe_id = $2;
    //     `, [userId, recipeId]
    //   )
    // },

    favsForFeatured: async () => {
      return query(`
        SELECT u.username, count(f.*) AS favourites, r.* FROM recipes r
        JOIN users u ON u.id = r.user_id
        LEFT JOIN favourites f ON f.recipe_id = r.id
        GROUP by r.id, u.username
        ORDER BY favourites DESC
        LIMIT 3; 
      `)
    },

    postNewRecipe: async (newRecipe) => {
      let {
        userId,
        title,
        difficultyId,
        duration,
        imageUrl,
        tags,
        servings,
        description,
        instructionSteps,
        ingredientList
      } = newRecipe


      const { rows: recipe } = await transact(async client => {
        return client.query(`
        INSERT INTO recipes (user_id, title, difficulty_id, duration, image_url, servings, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `, [userId, title, difficultyId, duration, imageUrl, servings, description]
        )
      })
      const recipeId = recipe[0].id;

      instructionSteps = instructionSteps.split('\n').map((e, i) => [i, e]);

      const instructions = await transact(async client => {
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

      const ingredients = await transact(async client => {
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

      const recipeTags = await transact(async client => {
        for (const tag of tags) {
          if (tag) {
            await client.query(`
            INSERT INTO recipe_tags (recipe_id, tag)
            VALUES ($1, $2)
            RETURNING *;
            `, [recipeId, tag.id])
          }
        }
      })
      return { recipe: recipe[0], instructions, ingredients, recipeTags }
    },

    editRecipe: async (body, recipeId) => {
      const {
        userId,
        title,
        difficultyId,
        duration,
        tags,
        imageUrl,
        servings,
        description,
        instructionSteps,
        ingredientList,
      } = body

      const { rows: recipe } = await transact(async client => {
        return client.query(`
            UPDATE recipes 
            SET user_id = $1, title = $2, difficulty_id = $3, duration = $4, image_url = $5, servings = $6, description = $7
            WHERE id = $8
            RETURNING *;
          `, [userId, title, difficultyId, duration, imageUrl, servings, description, recipeId]
        )
      })

      // delete any existing instructions for recipe
      await transact(async client => {
        return client.query(`
          DELETE FROM instructions 
          WHERE recipe_id = $1;
        `, [recipeId]
        );
      });

      instructionSteps = instructionSteps.split('\n').map((e, i) => [i, e]);

      const instructions = await transact(async client => {
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

      // delete any recipe_ingredients for recipe
      // ingredients will cascade
      await transact(async client => {
        return client.query(`
          DELETE FROM recipe_ingredients 
          WHERE recipe_id = $1;
        `, [recipeId]
        );
      });

      const processedIngredients = processIngredients(ingredientList);

      const ingredients = await transact(async client => {
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

      await transact(async client => {
        return client.query(`
          DELETE FROM recipe_tags
          WHERE recipe_id = $1;
        `, [recipeId]
        );
      });

      const recipeTags = await transact(async client => {
        for (const tag of tags) {
          if (tag) {
            await client.query(`
            INSERT INTO recipe_tags (recipe_id, tag)
            VALUES ($1, $2)
            RETURNING *;
            `, [recipeId, tag.id])
          }
        }
      })

      return { recipe: recipe[0] }
    },

    deleteRecipe: async (recipeId) => {
      return query(`
        DELETE FROM recipes
        WHERE id=$1
        `, [recipeId]
      )
    },

    getRecipesForUser: async (userId) => {
      return query(`
        SELECT r.*, u.username, count(f.*) AS favourites FROM recipes r
        JOIN users u ON u.id = r.user_id
        LEFT JOIN favourites f ON r.id = f.recipe_id
        WHERE r.user_id = $1
        GROUP BY r.id, u.username
        ORDER BY r.id
        `, [userId]
      )
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
    'tsp',
    'slice',
    'bottle',
    'clove',
    'dash',
    'sprig',
    'bunch',
    'piece',
    'strip'
  ];

  // if unit ends with an 's', remove it
  if (unit.slice(unit.length - 1) === 's') {
    unit = unit.slice(0, -1);
  }

  // look for unit in the array
  unitsIndex = units.indexOf(unit); // returns -1 if not found

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

    const obj = {
      quantity: 1,
      unitOfMeasure: 'each', // needs to be an ID from `select * from units_of_measure;`
      ingredient: ''
    }

    if (e.length === 1) { // single word
      obj.ingredient = e[0];
      // return [quantity, unit, ingredient];
      obj.unitOfMeasure = findUnitOfMeasureID(obj.unitOfMeasure);
      return obj;
    }

    if (e.length > 1) {

      // if the first value isn't a number, use 1
      if (!parseFloat(e[0])) {
        obj.quantity = 1
        obj.ingredient = e.flat().join(' ');
        obj.unitOfMeasure = findUnitOfMeasureID(obj.unitOfMeasure);
        return obj;
      }

      obj.quantity = parseFloat(e[0]);

      const ofIndex = e.findIndex(e => e === 'of');

      if (ofIndex === -1) { // 'of' not found
        obj.ingredient = e.slice(1, e.length).flat().join(' ');
      }

      if (ofIndex > 0) { // split array based on location of 'of'
        obj.unitOfMeasure = e.slice(1, ofIndex).flat().join(' ');
        obj.ingredient = e.slice(ofIndex + 1, e.length).flat().join(' ');
      }

      obj.unitOfMeasure = findUnitOfMeasureID(obj.unitOfMeasure);
      // obj.unitOfMeasure = 1; // hack it in for now
      return obj;
    }
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