import readlineSync from 'readline-sync';
import { LoanService } from '../services/LoanService';
import { printHeader, printSeparator, formatDate } from '../utils/formatters';

export class LoanController {
  private loanService: LoanService;
  constructor() { this.loanService = new LoanService(); }

  public async showMenu(): Promise<void> {
    let running = true;
    while (running) {
      printHeader('Gerenciamento de Empréstimos');
      console.log('1. Realizar empréstimo');
      console.log('2. Registrar devolução');
      console.log('3. Consultar empréstimos');
      console.log('4. Consultar empréstimo por ID');
      console.log('0. Voltar');
      printSeparator();

      const option = readlineSync.question('Escolha: ');
      try {
        switch (option) {
          case '1': await this.createLoan(); break;
          case '2': await this.returnBook(); break;
          case '3': await this.listAll(); break;
          case '4': await this.findById(); break;
          case '0': running = false; break;
          default: console.log('inválida.'); break;
        }
      } catch (error: any) { console.log(` ${error.message}`); }
    }
  }

  private async createLoan(): Promise<void> {
    const bookId = Number(readlineSync.question('ID do livro: '));
    const clientId = Number(readlineSync.question('ID do cliente: '));
    const loan = await this.loanService.createLoan(bookId, clientId);
    console.log(`Empréstimo registrado com ID ${loan.id}.`);
  }

  private async returnBook(): Promise<void> {
    const loanId = Number(readlineSync.question('ID do empréstimo: '));
    await this.loanService.returnBook(loanId);
    console.log('Devolução registrada com sucesso.');
  }

  private async listAll(): Promise<void> {
    const loans = await this.loanService.findAll();
    if (loans.length === 0) {
      console.log(' Nenhum empréstimo.');
      return;
    }

    printHeader('Lista de Empréstimos');
    loans.forEach((l) => {
      const status = l.return_date ? `Devolvido ${formatDate(l.return_date)}` : 'Ativo';
      console.log(`  ID: ${l.id} | ${l.book_title} → ${l.client_name} | ${formatDate(l.loan_date)} | ${status}`);
    });
    printSeparator();
  }

  private async findById(): Promise<void> {
    const id = Number(readlineSync.question('ID: '));
    const loan = await this.loanService.findById(id);
    console.log(`  Livro: ${loan.book_title} | Cliente: ${loan.client_name}`);
    console.log(`  Data: ${formatDate(loan.loan_date)} | Devolução: ${loan.return_date ? formatDate(loan.return_date) : 'Pendente'}`);
  }
}