/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('recipe_tags', {
    id: {
      type: 'SERIAL PRIMARY KEY',
      notNull: true
    },
    recipe_id: {
      type: 'INTEGER',
      references: 'recipes(id)',
      onDelete: 'CASCADE'
    },
    tag: {
      type: 'INTEGER',
      references: 'tags(id)',
      onDelete: 'CASCADE'
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('recipe_tags', {
    ifExists: true,
    cascade: true
  })
};