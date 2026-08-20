import { pool } from './database/connection.ts';
import { mainMenu } from './menus/mainMenu.ts';
import { EmployeeController } from './controllers/EmployeeController';




async function main() {
  try {
    await pool.query('SELECT NOW()')
    console.log("conectando")



    const employeeController = new EmployeeController();
    const loggedEmployee = await employeeController.login();

    if (!loggedEmployee) {
      await pool.end();
      process.exit(0);
    }


    await mainMenu();


  } catch (error) {
    console.error((error as unknown as Error).message)
  } finally {
    await pool.end()
  }

}

main()