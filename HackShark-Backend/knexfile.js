// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'HackShark-App',
      user: 'postgres',
      password: 'A&N'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'HackShark-App',
      user: 'postgres',
      password: 'A&N'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'HackShark_App',
      user:     'postgres',
      password: 'A&N'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
