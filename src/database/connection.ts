import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.PSQL_HOST || 'localhost',
  port: Number(process.env.PSQL_PORT) || 5432,
  user: process.env.PSQL_DB_USER || 'postgres',
  password: process.env.PSQL_DB_PASSWORD || 'password',
  database: process.env.PSQL_DB || 'bookstore',
})

