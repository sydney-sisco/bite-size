/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('difficulties', {
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
  pgm.dropTable('difficulties', {
    ifExists: true,
    cascade: true
  })
};
