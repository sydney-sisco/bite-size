/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.alterColumn('recipe_ingredients', 'quantity', {
    type: 'real USING CAST(quantity AS real)',
    references: 'quantity',
    onDelete: 'CASCADE'
  });
};

exports.down = pgm => {};
