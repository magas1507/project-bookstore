import { LoanRepository } from '../repositories/LoanRepository';
import { BookRepository } from '../repositories/BookRepository';
import { ClientRepository } from '../repositories/ClientRepository';
import type { Loan } from '../models/Loan';

export class LoanService {
  private loanRepository: LoanRepository;
  private bookRepository: BookRepository;
  private clientRepository: ClientRepository;

  constructor() {
    this.loanRepository = new LoanRepository();
    this.bookRepository = new BookRepository();
    this.clientRepository = new ClientRepository();
  }


  public async createLoan(bookId: number, clientId: number): Promise<Loan> {

    const book = await this.bookRepository.findById(bookId);
    if (!book) throw new Error(`Livro com ID ${bookId} não encontrado.`);


    const client = await this.clientRepository.findById(clientId);
    if (!client) throw new Error(`Cliente com ID ${clientId} não encontrado.`);


    if (book.available_quantity <= 0) {
      throw new Error(`Livro "${book.title}" não está disponível.`);
    }

    return this.loanRepository.createLoan(bookId, clientId);
  }


  public async returnBook(loanId: number): Promise<void> {
    return this.loanRepository.returnBook(loanId);
  }


  public async findAll(): Promise<Loan[]> {
    return this.loanRepository.findAll();
  }

  public async findById(id: number): Promise<Loan> {
    const loan = await this.loanRepository.findById(id);
    if (!loan) throw new Error(`Empréstimo com ID ${id} não encontrado.`);
    return loan;
  }
}