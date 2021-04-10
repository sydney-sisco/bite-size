/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('emojis', {
    id: {
      type: 'SERIAL PRIMARY KEY',
      notNull: true
    },
    name: {
      type: 'VARCHAR(256)',
      notNull: true
    },
    emoji: {
      type: 'VARCHAR(256)',
      notNull: true
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('emojis', {
    ifExists: true,
    cascade: true
  })
};
