/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.sql(`INSERT INTO recipes (user_id, difficulty_id, title, description, image_url, duration, servings) VALUES (1, 1, 'Moroccan Carrot Soup', 'Delicious carrot soup from North Africa', 'https://www.themealdb.com/images/media/meals/jcr46d1614763831.jpg', 30, 4);
`);

  pgm.sql(`INSERT INTO instructions (recipe_id, instruction, step) VALUES (1, 'Preheat oven to 180° C', 0);
INSERT INTO instructions (recipe_id, instruction, step) VALUES (1, 'Combine carrots, onion, garlic, cumin seeds, coriander seeds, salt and olive oil in a bowl and mix well. Transfer on a baking tray.', 1);
INSERT INTO instructions (recipe_id, instruction, step) VALUES (1, 'Put the baking tray in preheated oven and roast for 10-12 minutes or till carrots soften. Remove from heat and cool.', 2);
INSERT INTO instructions (recipe_id, instruction, step) VALUES (1, 'Grind the baked carrot mixture along with some water to make a smooth paste and strain in a bowl.', 3);
INSERT INTO instructions (recipe_id, instruction, step) VALUES (1, 'Heat the carrot mixture in a non-stick pan. Add two cups of water and bring to a boil. Add garam masala powder and mix. Add salt and mix well.', 4);
INSERT INTO instructions (recipe_id, instruction, step) VALUES (1, 'Remove from heat, add lemon juice and mix well.', 5);
INSERT INTO instructions (recipe_id, instruction, step) VALUES (1, 'Serve hot.', 6);
`);

  pgm.sql(`INSERT INTO ingredients (name) VALUES('carrots');
INSERT INTO ingredients (name) VALUES('onion');
INSERT INTO ingredients (name) VALUES('garlic clove');
INSERT INTO ingredients (name) VALUES('cumin');
INSERT INTO ingredients (name) VALUES('coriander');
INSERT INTO ingredients (name) VALUES('olive oil');
INSERT INTO ingredients (name) VALUES('garam masala');
INSERT INTO ingredients (name) VALUES('lemon juice');
`);

  pgm.sql(`INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 1, 6, 1);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 2, 1, 1);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 3, 4, 1);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 4, 1, 2);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 5, .5, 2);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 6, 1, 2);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 7, .25, 2);
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit_of_measure_id) VALUES (1, 8, 1, 2);
`)

  
  pgm.sql(`INSERT INTO units_of_measure (unit) VALUES ('each');
INSERT INTO units_of_measure (unit) VALUES ('tsp');
INSERT INTO units_of_measure (unit) VALUES ('tbs');
`)

}




