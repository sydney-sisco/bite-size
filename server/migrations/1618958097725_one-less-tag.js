/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.sql(`DELETE FROM tags WHERE id = 9;`)

};

exports.down = pgm => {};
