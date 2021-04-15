/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  // update id = 2 to cup
  pgm.sql(`UPDATE units_of_measure SET unit = 'cup' WHERE id=2`)
  
  // update id = 3 to ounce
  pgm.sql(`UPDATE units_of_measure SET unit = 'ounce' WHERE id=3`)

  // insert the rest
  pgm.sql(`INSERT INTO units_of_measure (unit) VALUES ('gallon');
INSERT INTO units_of_measure (unit) VALUES ('gram');
INSERT INTO units_of_measure (unit) VALUES ('kilogram');
INSERT INTO units_of_measure (unit) VALUES ('liter');
INSERT INTO units_of_measure (unit) VALUES ('milliliter');
INSERT INTO units_of_measure (unit) VALUES ('pint');
INSERT INTO units_of_measure (unit) VALUES ('pound');
INSERT INTO units_of_measure (unit) VALUES ('quart');
INSERT INTO units_of_measure (unit) VALUES ('tablespoon');
INSERT INTO units_of_measure (unit) VALUES ('teaspoon');`)
};

exports.down = pgm => {
  pgm.sql(`DELETE FROM units_of_measure`)
};
