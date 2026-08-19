import { ClientRepository } from '../repositories/ClientRepository';
import type { Client } from '../models/Client.ts';

export class ClientService {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  public async create(name: string, email?: string, phone?: string): Promise<Client> {
    if (!name || name.trim() === '') throw new Error('Nome é obrigatório.');

    const client: Client = {
      name: name.trim()
    };

    if (email) {
      client.email = email.trim();
    }

    if (phone) {
      client.phone = phone.trim();
    }

    return this.clientRepository.create(client);
  }

  public async findAll(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }
}  