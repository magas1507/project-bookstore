export interface Loan {
  id?: number;
  book_id: number;
  client_id: number;
  loan_date?: Date;
  return_date?: Date | null;
  book_title?: string;
  client_name?: string;
  created_at?: Date;
}