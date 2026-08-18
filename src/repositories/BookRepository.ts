import { pool } from '../database/connection';
import type { Book } from '../models/Book';

export class BookRepository {

  public async create(book: Book): Promise<Book> {
    const query = `
      INSERT INTO books (title, genre, publication_year, available_quantity, author_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [
      book.title,
      book.genre,
      book.publication_year,
      book.available_quantity,
      book.author_id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  public async findAll(): Promise<Book[]> {
    const query = `
      SELECT b.*, a.name AS author_name
      FROM books b
      INNER JOIN authors a ON b.author_id = a.id
      ORDER BY b.title ASC
    `;

    const result = await pool.query(query);
    return result.rows;
  }

  public async findById(id: number): Promise<Book | null> {
    const query = `
      SELECT b.*, a.name AS author_name
      FROM books b
      INNER JOIN authors a ON b.author_id = a.id
      WHERE b.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  public async update(id: number, book: Book): Promise<Book | null> {
    const query = `
      UPDATE books
      SET title = $1, genre = $2, publication_year = $3,
          available_quantity = $4, author_id = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [
      book.title, book.genre, book.publication_year,
      book.available_quantity, book.author_id, id,
    ];
    const result = await pool.query(query, values);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  public async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM books WHERE id = $1';
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}