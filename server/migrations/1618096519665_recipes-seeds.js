/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {

  pgm.renameColumn('difficulties', 'unit', 'name')

  pgm.sql(`INSERT INTO difficulties (name) VALUES ('Beginner');
INSERT INTO difficulties (name) VALUES ('Intermediate');
INSERT INTO difficulties (name) VALUES ('Advanced');
`);

}

