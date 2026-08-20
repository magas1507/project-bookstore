import { EmployeeRepository } from '../repositories/EmployeeRepository';
import type { Employee } from '../models/Employee';

export class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async authenticate(email: string, password: string): Promise<Employee | null> {
    if (!email || email.trim() === '') {
      console.log('Email não pode estar vazio.');
      return null;
    }

    if (!password || password.trim() === '') {
      console.log('Senha não pode estar vazia.');
      return null;
    }

    const employee = await this.employeeRepository.findByEmailAndPassword(
      email.trim(), password.trim()
    );

    if (!employee) {
      console.log('Email ou senha incorretos.');
      return null;
    }
    return employee;
  }
}