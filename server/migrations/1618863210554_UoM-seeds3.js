/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.sql(`INSERT INTO units_of_measure (unit) VALUES ('slice');
  INSERT INTO units_of_measure (unit) VALUES ('bottle');
  INSERT INTO units_of_measure (unit) VALUES ('clove');
  INSERT INTO units_of_measure (unit) VALUES ('dash');
  INSERT INTO units_of_measure (unit) VALUES ('sprig');
  INSERT INTO units_of_measure (unit) VALUES ('bunch');
  INSERT INTO units_of_measure (unit) VALUES ('piece');
  INSERT INTO units_of_measure (unit) VALUES ('strip');
 `)

};


exports.down = pgm => {
  pgm.sql(`DELETE FROM units_of_measure`)
};
