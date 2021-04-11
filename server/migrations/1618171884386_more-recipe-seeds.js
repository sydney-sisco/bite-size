/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.sql(`INSERT INTO recipes (user_id, difficulty_id, title, description, image_url, duration, servings) VALUES (1, 2, 'Portuguese custard tarts', 'custard tarts! custard tarts! custard tarts! custard tarts!', 'https://www.themealdb.com/images/media/meals/vmz7gl1614350221.jpg', 15, 24);`);
  pgm.sql(`INSERT INTO recipes (user_id, difficulty_id, title, description, image_url, duration, servings) VALUES (2, 2, 'Nanaimo Bars', 'Yum!', 'https://www.themealdb.com/images/media/meals/vwuprt1511813703.jpg', 10, 12);`);
  pgm.sql(`INSERT INTO recipes (user_id, difficulty_id, title, description, image_url, duration, servings) VALUES (3, 3, 'Pancakes', 'Pancakes Pancakes Pancakes Pancakes', 'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg', 45, 6);`);

};

exports.down = pgm => {};
