import { pool } from '../database/connection';
import type { Employee } from '../models/Employee';

export class EmployeeRepository {

  public async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<Employee | null> {

    const query = 'SELECT * FROM employees WHERE email = $1 AND password = $2';

    const result = await pool.query(query, [email, password]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }
}