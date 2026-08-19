import readlineSync from 'readline-sync';
import { ReportService } from '../services/ReportService';
import { printHeader, printSeparator, formatDate } from '../utils/formatters';

export class ReportController {
  private reportService: ReportService;

  constructor() {
    this.reportService = new ReportService();
  }

  public async showMenu(): Promise<void> {
    let running = true;

    while (running) {

      printHeader('Relatórios');
      console.log('1. Livros disponíveis');
      console.log('2. Livros emprestados');
      console.log('3. Livros por autor');
      console.log('4. Empréstimos por livro');
      console.log('5. Clientes com empréstimos ativos');
      console.log('0. Voltar');
      printSeparator();

      const option = readlineSync.question('Escolha: ');
      try {
        switch (option) {
          case '1':

            const available = await this.reportService.getAvailableBooks();

            printHeader('Livros Disponíveis');
            available.forEach((b) => console.log(`  ${b.title} | ${b.author_name} | Qtd: ${b.available_quantity}`));

            if (available.length === 0) console.log('  Nenhum livro disponível.');

            printSeparator();

            break;
          case '2':

            const borrowed = await this.reportService.getBorrowedBooks();

            printHeader('Livros Emprestados');

            borrowed.forEach((b) => console.log(`  ${b.title} → ${b.client_name} | ${formatDate(b.loan_date)}`));

            if (borrowed.length === 0) console.log('  Nenhum livro emprestado.');

            printSeparator();
            break;
          case '3':
            const byAuthor = await this.reportService.getBooksByAuthor();

            printHeader('Livros por Autor');

            byAuthor.forEach((a) => console.log(`  ${a.author_name}: ${a.book_count} livro(s)`));

            printSeparator();
            break;
          case '4':
            const loanCount = await this.reportService.getLoanCountByBook();

            printHeader('Empréstimos por Livro (Top 10)');

            loanCount.forEach((l) => console.log(`  ${l.title}: ${l.loan_count} empréstimo(s)`));

            printSeparator();
            break;
          case '5':
            const activeClients = await this.reportService.getClientsWithActiveLoans();

            printHeader('Clientes com Empréstimos Ativos');
            activeClients.forEach((c) => console.log(`  ${c.name} | ${c.email ?? 'N/A'} | ${c.active_loans} ativo(s)`));

            if (activeClients.length === 0) console.log('  Nenhum empréstimo ativo.');
            printSeparator();
            break;
          case '0': running = false; break;
          default: console.log('inválida.'); break;
        }
      } catch (error: any) {

        console.log(` ${error.message}`);
      }
    }
  }
}