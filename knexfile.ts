import path from 'path';
import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432, 
      user: 'postgres', 
      password: '121903', 
      database: 'test_plant_store' 
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'migrations')
    }
  }
};

export default config;