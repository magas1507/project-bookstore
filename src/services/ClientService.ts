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


  public async findById(id: number): Promise<Client> {
    const client = await this.clientRepository.findById(id);
    if (!client) throw new Error(`Cliente com ID ${id} não encontrado.`);
    return client;
  }

  public async update(id: number, name: string, email?: string, phone?: string): Promise<Client> {
    await this.findById(id);

    const client: Client = {
      name: name.trim()
    };

    if (email) {
      client.email = email.trim();
    }

    if (phone) {
      client.phone = phone.trim();
    }

    const updated = await this.clientRepository.update(id, client);
    if (!updated) throw new Error('Erro ao atualizar cliente.');
    return updated;
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);
    try {
      const deleted = await this.clientRepository.delete(id);
      if (!deleted) throw new Error('Erro ao remover cliente.');
    } catch (error: any) {
      if (error.code === '23503') {
        throw new Error('Não é possível remover: cliente possui empréstimos.');
      }
      throw error;
    }
  }
}  