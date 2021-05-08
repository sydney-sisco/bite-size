/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('instructions', {
    id: {
      type: 'SERIAL PRIMARY KEY',
      notNull: true
    },
    recipe_id: {
      type: 'INTEGER',
      references: 'recipes(id)',
      onDelete: 'CASCADE'
    },
    instruction: {
      type: 'TEXT',
      notNull: true
    },
    step: {
      type: 'INTEGER',
      notNull: true
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('instructions', {
    ifExists: true,
    cascade: true
  })
};
