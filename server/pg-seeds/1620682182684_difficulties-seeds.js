/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    INSERT INTO difficulties (name) VALUES ('Beginner');
    INSERT INTO difficulties (name) VALUES ('Intermediate');
    INSERT INTO difficulties (name) VALUES ('Advanced');
  `);
}

exports.down = pgm => {
  pgm.sql('DELETE FROM difficulties;')
}