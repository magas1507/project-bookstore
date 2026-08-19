import { BookRepository } from '../repositories/BookRepository';
import { AuthorRepository } from '../repositories/AuthorRepository';
import type { Book } from '../models/Book.ts';

export class BookService {
  private bookRepository: BookRepository;
  private authorRepository: AuthorRepository;

  constructor() {
    this.bookRepository = new BookRepository();
    this.authorRepository = new AuthorRepository();
  }

  public async create(
    title: string, authorId: number, availableQuantity: number,
    genre?: string, publicationYear?: number
  ): Promise<Book> {
    if (!title || title.trim() === '') throw new Error('Título é obrigatório.');
    if (availableQuantity < 0) throw new Error('Quantidade não pode ser negativa.');

    const author = await this.authorRepository.findById(authorId);
    if (!author) throw new Error(`Autor com ID ${authorId} não encontrado.`);

    const book: Book = {
      title: title.trim(),
      author_id: authorId,
      available_quantity: availableQuantity
    };

    if (genre) {
      book.genre = genre.trim();
    }

    if (publicationYear) {
      book.publication_year = publicationYear;
    }

    return this.bookRepository.create(book);
  }

  public async findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  public async findById(id: number): Promise<Book> {
    const book = await this.bookRepository.findById(id);
    if (!book) throw new Error(`Livro com ID ${id} não encontrado.`);
    return book;
  }

  public async update(
    id: number, title: string, authorId: number,
    availableQuantity: number, genre?: string, publicationYear?: number
  ): Promise<Book> {
    await this.findById(id);
    const author = await this.authorRepository.findById(authorId);
    if (!author) throw new Error(`Autor com ID ${authorId} não encontrado.`);

    const book: Book = {
      title: title.trim(),
      author_id: authorId,
      available_quantity: availableQuantity
    };

    if (genre) {
      book.genre = genre.trim();
    }

    if (publicationYear) {
      book.publication_year = publicationYear;
    }

    const updated = await this.bookRepository.update(id, book);
    if (!updated) throw new Error('Erro ao atualizar livro.');
    return updated;
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);
    try {
      const deleted = await this.bookRepository.delete(id);
      if (!deleted) throw new Error('Erro ao remover livro.');
    } catch (error: any) {
      if (error.code === '23503') {
        throw new Error('Não é possível remover: livro possui empréstimos.');
      }
      throw error;
    }
  }
}