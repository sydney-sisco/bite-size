/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.sql(`INSERT INTO emojis (name, emoji) VALUES ('Yum', '😋');
INSERT INTO emojis (name, emoji) VALUES ('Drool', '🤤');
INSERT INTO emojis (name, emoji) VALUES ('Dinner', '🍽');
INSERT INTO emojis (name, emoji) VALUES ('Cheers', '🥂');`)

};

exports.down = pgm => {

  pgm.sql(`DELETE FROM emojis;`)

};
