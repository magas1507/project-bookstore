import readlineSync from 'readline-sync';
import { ClientService } from '../services/ClientService';
import { printHeader, printSeparator } from '../utils/formatters';

export class ClientController {
  private clientService: ClientService;
  constructor() { this.clientService = new ClientService(); }

  public async showMenu(): Promise<void> {
    let running = true;
    while (running) {
      printHeader('Gerenciamento de Clientes');
      console.log('1. Cadastrar cliente');
      console.log('2. Listar clientes');
      console.log('3. Consultar cliente por ID');
      console.log('4. Atualizar cliente');
      console.log('5. Remover cliente');
      console.log('0. Voltar');
      printSeparator();

      const option = readlineSync.question('Escolha: ');
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
      } catch (error: any) { console.log(`${error.message}`); }
    }
  }

  private async create(): Promise<void> {
    const name = readlineSync.question('Nome: ');
    const email = readlineSync.question('Email (opcional): ');
    const phone = readlineSync.question('Telefone (opcional): ');
    const client = await this.clientService.create(name, email || undefined, phone || undefined);
    console.log(`Cliente "${client.name}" cadastrado com ID ${client.id}.`);
  }

  private async listAll(): Promise<void> {
    const clients = await this.clientService.findAll();

    if (clients.length === 0) { console.log('Nenhum cliente cadastrado.'); return; }
    printHeader('Lista de Clientes');
    clients.forEach((c) => {
      console.log(`  ID: ${c.id} | ${c.name} | ${c.email ?? 'N/A'} | ${c.phone ?? 'N/A'}`);
    });
    printSeparator();
  }

  private async findById(): Promise<void> {
    const id = Number(readlineSync.question('ID: '));
    const client = await this.clientService.findById(id);
    console.log(`  ID: ${client.id} | ${client.name} | ${client.email ?? 'N/A'} | ${client.phone ?? 'N/A'}`);
  }

  private async update(): Promise<void> {
    const id = Number(readlineSync.question('ID: '));
    const current = await this.clientService.findById(id);
    const name = readlineSync.question(`Nome [${current.name}]: `) || current.name;
    const email = readlineSync.question(`Email [${current.email ?? ''}]: `) || current.email;
    const phone = readlineSync.question(`Telefone [${current.phone ?? ''}]: `) || current.phone;
    const updated = await this.clientService.update(id, name, email, phone);
    console.log(`Cliente atualizado: ${updated.name}`);
  }

  private async remove(): Promise<void> {
    const id = Number(readlineSync.question('ID: '));
    const client = await this.clientService.findById(id);
    const confirm = readlineSync.question(`Remover "${client.name}"? (s/n): `);

    if (confirm.toLowerCase() === 's') {
      await this.clientService.delete(id);
      console.log('Cliente Eliminado.');
    }
  }
}