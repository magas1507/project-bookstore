import { pool } from '../database/connection';

export class ReportRepository {

  public async getAvailableBooks(): Promise<any[]> {
    const query = `
      SELECT b.id, b.title, b.available_quantity, a.name AS author_name
      FROM books b
      INNER JOIN authors a ON b.author_id = a.id
      WHERE b.available_quantity > 0
      ORDER BY b.title ASC
    `;
    const result = await pool.query(query);
    return result.rows;
  }


  public async getBorrowedBooks(): Promise<any[]> {
    const query = `
      SELECT b.title, c.name AS client_name, l.loan_date
      FROM loans l
      INNER JOIN books b ON l.book_id = b.id
      INNER JOIN clients c ON l.client_id = c.id
      WHERE l.return_date IS NULL
      ORDER BY l.loan_date ASC
    `;

    const result = await pool.query(query);
    return result.rows;
  }


  public async getBooksByAuthor(): Promise<any[]> {
    const query = `
      SELECT a.name AS author_name, COUNT(b.id) AS book_count
      FROM authors a
      LEFT JOIN books b ON a.id = b.author_id
      GROUP BY a.id, a.name
      ORDER BY book_count DESC
    `;

    const result = await pool.query(query);
    return result.rows;
  }


  public async getLoanCountByBook(): Promise<any[]> {
    const query = `
      SELECT b.title, COUNT(l.id) AS loan_count
      FROM books b
      LEFT JOIN loans l ON b.id = l.book_id
      GROUP BY b.id, b.title
      ORDER BY loan_count DESC
      LIMIT 10
    `;

    const result = await pool.query(query);
    return result.rows;
  }


  public async getClientsWithActiveLoans(): Promise<any[]> {
    const query = `
      SELECT c.name, c.email, COUNT(l.id) AS active_loans
      FROM clients c
      INNER JOIN loans l ON c.id = l.client_id
      WHERE l.return_date IS NULL
      GROUP BY c.id, c.name, c.email
      ORDER BY active_loans DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}