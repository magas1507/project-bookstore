import { pool } from '../database/connection';
import type { Client } from '../models/Client';

export class ClientRepository {

  public async create(client: Client): Promise<Client> {
    const query = `
      INSERT INTO clients (name, email, phone)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [client.name, client.email, client.phone]);
    return result.rows[0];
  }

  public async findAll(): Promise<Client[]> {
    const result = await pool.query('SELECT * FROM clients ORDER BY name ASC');
    return result.rows;
  }
}