/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.sql(`INSERT INTO users (username, email_address, password) VALUES ('eddy','Ed@example.com','password');
INSERT INTO users (username, email_address, password) VALUES ('james','James@example.com','password');
INSERT INTO users (username, email_address, password) VALUES ('holden','Holden@example.com','password');
INSERT INTO users (username, email_address, password) VALUES ('ted','Ted@example.com','password');
INSERT INTO users (username, email_address, password) VALUES ('jeff','Jeff@example.com','password');
INSERT INTO users (username, email_address, password) VALUES ('lian','Lian@example.com','password');
INSERT INTO users (username, email_address, password) VALUES ('mattyboy','Matthew@example.com','password');
INSERT INTO users (username, email_address, password) VALUES ('daqueen','Meg@example.com','password');
INSERT INTO users (username, email_address, password) VALUES ('channtybee','Chantal@example.com','password');
`)
}

exports.down = pgm => {
  pgm.sql('DELETE FROM users;')
}
