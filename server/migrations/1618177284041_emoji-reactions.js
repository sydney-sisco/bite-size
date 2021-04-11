/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.sql(`INSERT INTO emojis (name, emoji) VALUES ('Yum', '😋');
INSERT INTO emojis (name, emoji) VALUES ('Drool', '🤤');
INSERT INTO emojis (name, emoji) VALUES ('Dinner', '🍽');
INSERT INTO emojis (name, emoji) VALUES ('Cheers', '🥂');`)

  pgm.sql(`INSERT INTO user_emoji_reactions (user_id, emoji_id, recipe_id) VALUES ('1', '1', '1');
  INSERT INTO user_emoji_reactions (user_id, emoji_id, recipe_id) VALUES ('1', '2', '1');
  INSERT INTO user_emoji_reactions (user_id, emoji_id, recipe_id) VALUES ('1', '4', '1');
  INSERT INTO user_emoji_reactions (user_id, emoji_id, recipe_id) VALUES ('2', '1', '1');
  INSERT INTO user_emoji_reactions (user_id, emoji_id, recipe_id) VALUES ('2', '1', '2');
  INSERT INTO user_emoji_reactions (user_id, emoji_id, recipe_id) VALUES ('3', '1', '1');
  INSERT INTO user_emoji_reactions (user_id, emoji_id, recipe_id) VALUES ('4', '1', '1');
  INSERT INTO user_emoji_reactions (user_id, emoji_id, recipe_id) VALUES ('5', '1', '1');
  INSERT INTO user_emoji_reactions (user_id, emoji_id, recipe_id) VALUES ('6', '4', '1');`)

};

exports.down = pgm => {

  pgm.sql(`DELETE FROM emojis;`)
  pgm.sql(`DELETE FROM user_emoji_reactions;`)

};
