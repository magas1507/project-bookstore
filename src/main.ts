import { pool } from './database/connection.ts';

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