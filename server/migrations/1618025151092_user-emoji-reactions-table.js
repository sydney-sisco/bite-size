/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('user_emoji_reactions', {
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
    },
    emoji_id: {
      type: 'INTEGER',
      references: emojis(id),
      onDelete: 'CASCADE'
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('user_emoji_reactions', {
    ifExists: true,
    cascade: true
  })
};
