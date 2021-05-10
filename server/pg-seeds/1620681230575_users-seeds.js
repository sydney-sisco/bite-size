/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
  INSERT INTO users (username, email_address, password) VALUES ('Sydney','sydney@example.com','password');
  INSERT INTO users (username, email_address, password) VALUES ('Evan','evan@example.com','password');
  INSERT INTO users (username, email_address, password) VALUES ('Eppalea','eppalea@example.com','password');
`)
}

exports.down = pgm => {
  pgm.sql('DELETE FROM users;')
}

