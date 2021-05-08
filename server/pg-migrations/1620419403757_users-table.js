/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('users', {
    id: {
      type: 'SERIAL PRIMARY KEY',
      notNull: true
    },
    username: {
      type: 'VARCHAR(256)',
      notNull: true
    },
    email_address: {
      type: 'VARCHAR(256)',
      notNull: true
    },
    password: {
      type: 'VARCHAR(256)',
      notNull: true
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('users', {
    ifExists: true,
    cascade: true
  })
}
