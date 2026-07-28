import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  host: process.env.PSQL_HOST || 'localhost',
  port: Number(process.env.PSQL_PORT) || 5432,
  user: process.env.PSQL_DB_USER || 'postgres',
  password: process.env.PSQL_DB_PASSWORD || 'password',
  database: process.env.PSQL_DB || 'bookstore',
})

async function main() {
  try {
    await pool.query('SELECT NOW()')
    console.log("conectando")

  } catch (error) {
    console.error((error as unknown as Error).message)
  } finally {
    await pool.end()
  }

}

main()