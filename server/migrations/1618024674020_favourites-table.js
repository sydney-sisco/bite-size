/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('favourites', {
    id: {
      type: 'SERIAL PRIMARY KEY',
      notNull: true
    },
    user_id: {
      type: 'INTEGER',
      references: users(id),
      onDelete: 'CASCADE'
    },
    recipe_id: {
      type: 'INTEGER',
      references: recipes(id),
      onDelete: 'CASCADE'
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('favourites', {
    ifExists: true,
    cascade: true
  })
};
