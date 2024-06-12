import "dotenv/config";
import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	migrations: [`${__dirname}/migrations/*.{ts, js}`],
	entities: [`${__dirname}/Model/*.{ts, js}`]
})