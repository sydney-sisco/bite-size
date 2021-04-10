/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

  pgm.renameColumn( users, user_id, id);


  pgm.createTable('recipes', {
    id: {
      type: 'SERIAL PRIMARY KEY',
      notNull: true
    },
    user_id: {
      type: 'INTEGER',
      references: users(id),
      onDelete: 'CASCADE'
    },
    difficulty_id: {
      type: 'INTEGER',
      references: difficulties(id),
      onDelete: 'CASCADE'
    },
    title: {
      type: 'VARCHAR(256)',
      notNull: true
    },
    description: {
      type: 'VARCHAR(256)',
      notNull: false
    },
    image_url: {
      type: 'VARCHAR(256)',
      notNull: false
    },
    duration: {
      type: 'INTEGER',
      notNull: false
    },
    servings: {
      type: 'INTEGER',
      notNull: false
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('recipes', {
    ifExists: true,
    cascade: true
  })
};
