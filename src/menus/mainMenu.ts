import readlineSync from 'readline-sync';
import { printHeader, printSeparator } from '../utils/formatters';
import { AuthorController } from '../controllers/AuthorController';
import { BookController } from '../controllers/BookController';
import { ClientController } from '../controllers/ClientController';
import { LoanController } from '../controllers/LoanController';
import { ReportController } from '../controllers/ReportController';


export async function mainMenu(): Promise<void> {
  const authorController = new AuthorController();
  const bookController = new BookController();
  const clientController = new ClientController();
  const loanController = new LoanController();
  const reportController = new ReportController();



  let running = true;

  while (running) {
    printHeader('BookStore Manager CLI — Menu Principal');
    console.log('1 Autores');
    console.log('2 Livros');
    console.log('3 Clientes');
    console.log('4 Empréstimos');
    console.log('5 Relatórios');
    console.log('0 Encerrar aplicação');
    printSeparator();

    const option = readlineSync.question('Escolha um módulo: ');

    switch (option) {
      case '1':
        await authorController.showMenu();
        break
      case '2':
        await bookController.showMenu();
        break;
      case '3': await clientController.showMenu();
        break;

      case '4': await loanController.showMenu();
        break;

      case '5': await reportController.showMenu();
        break;

      case '0':
        running = false;
        console.log('\n Até logo!');
        break
      default:
        console.log(' Opção inválida.');
        break
    }
  }
}

