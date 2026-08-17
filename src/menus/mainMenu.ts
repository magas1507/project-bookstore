import readlineSync from 'readline-sync';
import { printHeader, printSeparator } from '../utils/formatters';


export async function mainMenu(): Promise<void> {

  let running = true;

  while (running) {
    printHeader('📚 BookStore Manager CLI — Menu Principal');
    console.log('1. Autores');
    console.log('2. Livros');
    console.log('3. Clientes');
    console.log('4. Empréstimos');
    console.log('5. Relatórios');
    console.log('0. Encerrar aplicação');
    printSeparator();

    const option = readlineSync.question('Escolha um módulo: ');

    switch (option) {
      case '1':
        await console.log('testando menu');
        break;
      case '0':
        running = false;
        console.log('\n👋 Até logo!');
        break;
      default:
        console.log('❌ Opção inválida.');
        break;
    }
  }
}

