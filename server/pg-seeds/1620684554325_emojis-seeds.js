/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    INSERT INTO emojis (name, emoji) VALUES ('Yum', '🤤');
    INSERT INTO emojis (name, emoji) VALUES ('Yuck', '🤢');
    INSERT INTO emojis (name, emoji) VALUES ('Hot!', '🥵');
    INSERT INTO emojis (name, emoji) VALUES ('Hmm..', '🤔');
  `)
};

exports.down = pgm => {};
