import { pool } from '../database/connection';
import type { Loan } from '../models/Loan';

export class LoanRepository {

  public async createLoan(bookId: number, clientId: number): Promise<Loan> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN'); // Inicia transação


      const insertResult = await client.query(
        `INSERT INTO loans (book_id, client_id, loan_date)
         VALUES ($1, $2, CURRENT_DATE) RETURNING *`,
        [bookId, clientId]
      );


      await client.query(
        `UPDATE books SET available_quantity = available_quantity - 1
         WHERE id = $1`,
        [bookId]
      );

      await client.query('COMMIT');
      return insertResult.rows[0];

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }


  public async returnBook(loanId: number): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');


      const loanResult = await client.query(
        'SELECT * FROM loans WHERE id = $1 AND return_date IS NULL',
        [loanId]
      );

      if (loanResult.rows.length === 0) {
        await client.query('ROLLBACK');
        throw new Error('Empréstimo não encontrado ou já devolvido.');
      }

      const bookId = loanResult.rows[0].book_id;


      await client.query(
        'UPDATE loans SET return_date = CURRENT_DATE WHERE id = $1',
        [loanId]
      );


      await client.query(
        'UPDATE books SET available_quantity = available_quantity + 1 WHERE id = $1',
        [bookId]
      );

      await client.query('COMMIT');

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}