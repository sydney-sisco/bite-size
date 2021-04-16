/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.sql(`INSERT INTO units_of_measure (unit) VALUES ('deciliter');
  INSERT INTO units_of_measure (unit) VALUES ('dL');
  INSERT INTO units_of_measure (unit) VALUES ('fluid ounce');
  INSERT INTO units_of_measure (unit) VALUES ('gal');
  INSERT INTO units_of_measure (unit) VALUES ('g');
  INSERT INTO units_of_measure (unit) VALUES ('kg');
  INSERT INTO units_of_measure (unit) VALUES ('L');
  INSERT INTO units_of_measure (unit) VALUES ('mL');
  INSERT INTO units_of_measure (unit) VALUES ('oz');
  INSERT INTO units_of_measure (unit) VALUES ('pt');
  INSERT INTO units_of_measure (unit) VALUES ('lb');
  INSERT INTO units_of_measure (unit) VALUES ('qt');
  INSERT INTO units_of_measure (unit) VALUES ('tbsp');
  INSERT INTO units_of_measure (unit) VALUES ('tsp');`)

};


exports.down = pgm => {
  pgm.sql(`DELETE FROM units_of_measure`)
};
