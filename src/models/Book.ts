export interface Book {
  id?: number;
  title: string;
  genre?: string;
  publication_year?: number;
  available_quantity: number;
  author_id: number;
  author_name?: string;
  created_at?: Date;
}