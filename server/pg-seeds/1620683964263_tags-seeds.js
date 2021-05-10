/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.sql(`
    INSERT INTO tags (name) VALUES ('Vegetarian');
    INSERT INTO tags (name) VALUES ('Vegan');
    INSERT INTO tags (name) VALUES ('Poultry');
    INSERT INTO tags (name) VALUES ('Seafood');
    INSERT INTO tags (name) VALUES ('Pork');
    INSERT INTO tags (name) VALUES ('Beef');
    INSERT INTO tags (name) VALUES ('Gluten-Free');
    INSERT INTO tags (name) VALUES ('Lactose-Free');
    INSERT INTO tags (name) VALUES ('Breakfast');
    INSERT INTO tags (name) VALUES ('Brunch');
    INSERT INTO tags (name) VALUES ('Lunch');
    INSERT INTO tags (name) VALUES ('Dinner');
    INSERT INTO tags (name) VALUES ('Dessert');
  `)
};

exports.down = pgm => {
  pgm.sql(`DELETE FROM tags`)
};