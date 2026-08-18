import { AuthorRepository } from '../repositories/AuthorRepository';
import type { Author } from '../models/Author';

export class AuthorService {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();
  }

  public async create(name: string, nationality?: string): Promise<Author> {
    if (!name || name.trim() === '') {
      throw new Error('Nome do autor é obrigatório.');
    }

    const author: Author = {
      name: name.trim()
    };

    if (nationality) {
      author.nationality = nationality.trim();
    }

    return this.authorRepository.create(author);
  }

  public async findAll(): Promise<Author[]> {
    return this.authorRepository.findAll();
  }

  public async findById(id: number): Promise<Author> {
    const author = await this.authorRepository.findById(id);
    if (!author) {
      throw new Error(`Autor com ID ${id} não encontrado.`);
    }
    return author;
  }

  public async update(id: number, name: string, nationality?: string): Promise<Author> {
    await this.findById(id);
    if (!name || name.trim() === '') {
      throw new Error('Nome do autor é obrigatório.');
    }

    const author: Author = {
      name: name.trim()
    };

    if (nationality) {
      author.nationality = nationality.trim();
    }

    const updated = await this.authorRepository.update(id, author);
    if (!updated) throw new Error('Erro ao atualizar autor.');
    return updated;
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);
    try {
      const deleted = await this.authorRepository.delete(id);
      if (!deleted) throw new Error('Erro ao remover autor.');
    } catch (error: any) {
      if (error.code === '23503') {
        throw new Error('Não é possível remover: autor possui livros cadastrados.');
      }
      throw error;
    }
  }
}