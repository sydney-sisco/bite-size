/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.sql(`UPDATE emojis SET name = 'Yum', emoji = '🤤' where id = 1;`)
  pgm.sql(`UPDATE emojis SET name = 'Yuck', emoji = '🤢' where id = 2;`)
  pgm.sql(`UPDATE emojis SET name = 'Hot!', emoji = '🥵' where id = 3;`)
  pgm.sql(`UPDATE emojis SET name = 'Hmm..', emoji = '🤔' where id = 4;`)

};

exports.down = pgm => {

  pgm.sql(`DELETE FROM emojis`)

};
