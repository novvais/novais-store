import "dotenv/config"
import path from 'path';
import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT), 
      user: process.env.DB_USER, 
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_DATABASE 
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'migrations')
    }
  }
};

export default config;