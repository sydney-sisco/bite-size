/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    INSERT INTO units_of_measure (unit) VALUES ('each');
    INSERT INTO units_of_measure (unit) VALUES ('cup');
    INSERT INTO units_of_measure (unit) VALUES ('ounce');
    INSERT INTO units_of_measure (unit) VALUES ('gallon');
    INSERT INTO units_of_measure (unit) VALUES ('gram');
    INSERT INTO units_of_measure (unit) VALUES ('kilogram');
    INSERT INTO units_of_measure (unit) VALUES ('liter');
    INSERT INTO units_of_measure (unit) VALUES ('milliliter');
    INSERT INTO units_of_measure (unit) VALUES ('pint');
    INSERT INTO units_of_measure (unit) VALUES ('pound');
    INSERT INTO units_of_measure (unit) VALUES ('quart');
    INSERT INTO units_of_measure (unit) VALUES ('tablespoon');
    INSERT INTO units_of_measure (unit) VALUES ('teaspoon');
    INSERT INTO units_of_measure (unit) VALUES ('deciliter');
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
    INSERT INTO units_of_measure (unit) VALUES ('tsp');
    INSERT INTO units_of_measure (unit) VALUES ('slice');
    INSERT INTO units_of_measure (unit) VALUES ('bottle');
    INSERT INTO units_of_measure (unit) VALUES ('clove');
    INSERT INTO units_of_measure (unit) VALUES ('dash');
    INSERT INTO units_of_measure (unit) VALUES ('sprig');
    INSERT INTO units_of_measure (unit) VALUES ('bunch');
    INSERT INTO units_of_measure (unit) VALUES ('piece');
    INSERT INTO units_of_measure (unit) VALUES ('strip');
  `)
};

exports.down = pgm => {};
