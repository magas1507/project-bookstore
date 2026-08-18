import readlineSync from 'readline-sync';
import { AuthorService } from '../services/AuthorService';
import { printHeader, printSeparator } from '../utils/formatters';

export class AuthorController {
  private authorService: AuthorService;

  constructor() {
    this.authorService = new AuthorService();
  }

  public async showMenu(): Promise<void> {
    let running = true;

    while (running) {
      printHeader('Gerenciamento de Autores');
      console.log('1. Cadastrar autor');
      console.log('2. Listar autores');
      console.log('3. Consultar por ID');
      console.log('4. Atualizar autor');
      console.log('5. Remover autor');
      console.log('0. Voltar ao menu principal');
      printSeparator();

      const option = readlineSync.question('Escolha uma opção: ');

      try {
        switch (option) {
          case '1': await this.create(); break;
          case '2': await this.listAll(); break;
          case '3': await this.findById(); break;
          case '4': await this.update(); break;
          case '5': await this.remove(); break;
          case '0': running = false; break;
          default: console.log('inválida.'); break;
        }
      } catch (error: any) {
        console.log(`${error.message}`);
      }
    }
  }

  private async create(): Promise<void> {
    const name = readlineSync.question('Nome do autor: ');
    const nationality = readlineSync.question('Nacionalidade (opcional): ');
    const author = await this.authorService.create(name, nationality || undefined);
    console.log(`Autor "${author.name}" cadastrado com ID ${author.id}.`);
  }

  private async listAll(): Promise<void> {
    const authors = await this.authorService.findAll();
    if (authors.length === 0) {
      console.log('Nenhum autor cadastrado.');
      return;
    }
    printHeader('Lista de Autores');
    authors.forEach((author) => {
      console.log(`  ID: ${author.id} | ${author.name} | ${author.nationality ?? 'N/A'}`);
    });
    printSeparator();
  }

  private async findById(): Promise<void> {
    const id = Number(readlineSync.question('ID do autor: '));
    const author = await this.authorService.findById(id);
    console.log(`  ID: ${author.id} | ${author.name} | ${author.nationality ?? 'N/A'}`);
  }

  private async update(): Promise<void> {
    const id = Number(readlineSync.question('ID do autor a atualizar: '));
    const current = await this.authorService.findById(id);
    console.log(`Atual: ${current.name} | ${current.nationality ?? 'N/A'}`);

    const name = readlineSync.question(`Novo nome [${current.name}]: `) || current.name;
    const nationalityInput = readlineSync.question(
      `Nova nacionalidade [${current.nationality ?? ''}]: `
    );

    const nationality = nationalityInput || current.nationality || undefined;

    const updated = await this.authorService.update(id, name, nationality);
    console.log(` Nacionalidade atualizada: ${updated.name}`);
  }

  private async remove(): Promise<void> {
    const id = Number(readlineSync.question('Coloca o ID do autor a remover: '));
    const author = await this.authorService.findById(id);
    const confirm = readlineSync.question(`Remover "${author.name}"? (s/n): `);
    if (confirm.toLowerCase() === 's') {
      await this.authorService.delete(id);
      console.log('Pronto, removido!');
    } else {
      console.log('Operação cancelada.');
    }
  }
}