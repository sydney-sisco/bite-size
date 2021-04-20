/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.sql(`INSERT INTO users (username, email_address, password) VALUES ('sydney','sydney@example.com','password');
  INSERT INTO users (username, email_address, password) VALUES ('evan','evan@example.com','password');
  INSERT INTO users (username, email_address, password) VALUES ('eppalea','eppalea@example.com','password');
  `);

};

exports.down = pgm => {

};
