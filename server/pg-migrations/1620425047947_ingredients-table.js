/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('ingredients', {
    id: {
      type: 'SERIAL PRIMARY KEY',
      notNull: true
    },
    name: {
      type: 'VARCHAR(256)',
      notNull: true
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('ingredients', {
    ifExists: true,
    cascade: true
  })
};