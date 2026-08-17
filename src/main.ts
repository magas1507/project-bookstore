import { pool } from './database/connection.ts';
import { mainMenu } from './menus/mainMenu.ts';


async function main() {
  try {
    await pool.query('SELECT NOW()')
    console.log("conectando")
    await mainMenu();


  } catch (error) {
    console.error((error as unknown as Error).message)
  } finally {
    await pool.end()
  }

}

main()