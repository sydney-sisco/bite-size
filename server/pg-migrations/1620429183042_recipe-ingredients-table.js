/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
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
      notNull: true
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('recipe_ingredients', {
    ifExists: true,
    cascade: true
  })
};