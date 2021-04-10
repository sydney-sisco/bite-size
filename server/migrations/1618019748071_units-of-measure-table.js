/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('units_of_measure', {
    id: {
      type: 'SERIAL PRIMARY KEY',
      notNull: true
    },
    unit: {
      type: 'VARCHAR(256)',
      notNull: true
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('units_of_measure', {
    ifExists: true,
    cascade: true
  })
};
