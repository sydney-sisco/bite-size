/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.sql(`INSERT INTO favourites (user_id, recipe_id) VALUES (1, 1)`);
  pgm.sql(`INSERT INTO favourites (user_id, recipe_id) VALUES (1, 2)`);
  pgm.sql(`INSERT INTO favourites (user_id, recipe_id) VALUES (1, 3)`);
  pgm.sql(`INSERT INTO favourites (user_id, recipe_id) VALUES (1, 4)`);
  pgm.sql(`INSERT INTO favourites (user_id, recipe_id) VALUES (2, 1)`);
  pgm.sql(`INSERT INTO favourites (user_id, recipe_id) VALUES (3, 1)`);
  pgm.sql(`INSERT INTO favourites (user_id, recipe_id) VALUES (4, 1)`);

};

exports.down = pgm => {
  pgm.sql(`DELETE FROM favourites`);
};
