import { pool } from '../database/connection';
import type { Author } from '../models/Author';

export class AuthorRepository {

  public async create(author: Author): Promise<Author> {
    const query = `
      INSERT INTO authors (name, nationality)
      VALUES ($1, $2)
      RETURNING *
    `;

    const result = await pool.query(query, [author.name, author.nationality]);
    return result.rows[0];
  }

  public async findAll(): Promise<Author[]> {
    const query = 'SELECT * FROM authors ORDER BY name ASC';
    const result = await pool.query(query);
    return result.rows;
  }

  public async findById(id: number): Promise<Author | null> {
    const query = 'SELECT * FROM authors WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }


  public async update(id: number, author: Author): Promise<Author | null> {
    const query = `
      UPDATE authors
      SET name = $1, nationality = $2
      WHERE id = $3
      RETURNING *
    `;
    const result = await pool.query(query, [author.name, author.nationality, id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }


  public async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM authors WHERE id = $1';
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}