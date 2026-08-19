import readlineSync from 'readline-sync';
import { BookService } from '../services/BookService';
import { printHeader, printSeparator } from '../utils/formatters';

export class BookController {

  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  public async showMenu(): Promise<void> {
    let running = true;
    while (running) {
      printHeader('Gerenciamento de Livros');
      console.log('1. Cadastrar livro');
      console.log('2. Listar livros');
      console.log('3. Consultar livro por ID');
      console.log('4. Atualizar livro');
      console.log('5. Remover livro');
      console.log('0. Voltar');
      printSeparator();

      const option = readlineSync.question('Escolha: ');
      try {
        switch (option) {
          case '1': await this.create();
            break;
          case '2': await this.listAll();
            break;
          case '3': await this.findById();
            break;
          case '4': await this.update();
            break;
          case '5': await this.remove();
            break;
          case '0': running = false;
            break;
          default: console.log('Inválida.');
            break;
        }
      } catch (error: any) { console.log(`${error.message}`); }
    }
  }

  private async create(): Promise<void> {
    const title = readlineSync.question('Título: ');
    const authorId = Number(readlineSync.question('ID do autor: '));
    const quantity = Number(readlineSync.question('Quantidade disponível: '));
    const genre = readlineSync.question('Gênero (opcional): ');
    const year = readlineSync.question('Ano publicação (opcional): ');

    const book = await this.bookService.create(
      title, authorId, quantity, genre || undefined,
      year ? Number(year) : undefined
    );
    console.log(`Livro "${book.title}" cadastrado com ID ${book.id}.`);
  }

  private async listAll(): Promise<void> {
    const books = await this.bookService.findAll();

    if (books.length === 0) {
      console.log('Não tem livros cadastrado.');
      return;
    }

    printHeader('Lista de Livros');

    books.forEach((book) => {
      console.log(`  ID: ${book.id} | ${book.title} | Autor: ${book.author_name} | Qtd: ${book.available_quantity}`);
    });
    printSeparator();
  }

  private async findById(): Promise<void> {
    const id = Number(readlineSync.question('ID do livro: '));
    const book = await this.bookService.findById(id);

    console.log(`  ID: ${book.id} | ${book.title} | Autor: ${book.author_name}`);

    console.log(`  Gênero: ${book.genre ?? 'N/A'} | Ano: ${book.publication_year ?? 'N/A'} | Qtd: ${book.available_quantity}`);
  }

  private async update(): Promise<void> {

    const id = Number(readlineSync.question('ID do livro: '));
    const current = await this.bookService.findById(id);
    const title = readlineSync.question(`Título [${current.title}]: `) || current.title;

    const authorId = Number(readlineSync.question(`ID autor [${current.author_id}]: `) || current.author_id);

    const quantity = Number(readlineSync.question(`Quantidade [${current.available_quantity}]: `) || current.available_quantity);

    const genre = readlineSync.question(`Gênero [${current.genre ?? ''}]: `) || current.genre;

    const year = readlineSync.question(`Ano [${current.publication_year ?? ''}]: `);

    const updated = await this.bookService.update(
      id, title, authorId, quantity, genre ?? undefined,
      year ? Number(year) : current.publication_year
    );

    console.log(`Livro atualizado: ${updated.title}`);
  }

  private async remove(): Promise<void> {

    const id = Number(readlineSync.question('ID do livro: '));
    const book = await this.bookService.findById(id);
    const confirm = readlineSync.question(`Remover "${book.title}"? (s/n): `);

    if (confirm.toLowerCase() === 's') {
      await this.bookService.delete(id);
      console.log('Livro eliminado');
    }
  }
}