/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.dropTable('recipe_ingredients', {
    ifExists: true,
    cascade: true
  });

  pgm.createTable('recipe_ingredients', {
    id: {
      type: 'SERIAL PRIMARY KEY',
      notNull: true
    },
    recipe_id: {
      type: 'INTEGER',
      references: 'recipes(id)',
      onDelete: 'CASCADE'
    },
    ingredient_id: {
      type: 'INTEGER',
      references: 'ingredients(id)',
      onDelete: 'CASCADE'
    },
    quantity: {
      type: 'INTEGER',
      notNull: true
    },
    unit_of_measure_id: {
      type: 'INTEGER',
      references: 'units_of_measure(id)',
      onDelete: 'CASCADE'
    }
  });

  pgm.sql(`INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 1, 6, 1);
  INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 2, 1, 1);
  INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 3, 4, 1);
  INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 4, 1, 2);
  INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 5, .5, 2);
  INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 6, 1, 2);
  INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 7, .25, 2);
  INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 8, 1, 2);
  `)

  
};
