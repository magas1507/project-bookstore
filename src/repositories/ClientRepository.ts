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

  public async findById(id: number): Promise<Client | null> {
    const result = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  public async update(id: number, client: Client): Promise<Client | null> {
    const query = `
      UPDATE clients SET name = $1, email = $2, phone = $3
      WHERE id = $4 RETURNING *
    `;
    const result = await pool.query(query, [client.name, client.email, client.phone, id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM clients WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}