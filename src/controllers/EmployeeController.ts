import readlineSync from 'readline-sync';
import { EmployeeService } from '../services/EmployeeService';
import type { Employee } from '../models/Employee';

export class EmployeeController {
  private employeeService: EmployeeService;
  constructor() { this.employeeService = new EmployeeService(); }

  public async login(): Promise<Employee | null> {
    console.log('\n************************************');
    console.log('   BookStore Manager CLI');
    console.log('   Login de Funcionário');
    console.log('**************************************\n');

    while (true) {
      const inputEmail = readlineSync.question('Email: ');
      if (inputEmail.toLowerCase() === 'sair') {
        console.log('\n Encerrando...');
        return null;
      }

      const inputPassword = readlineSync.question(' Senha: ', {
        hideEchoBack: true, mask: '*',
      });

      try {
        const loggedEmployee = await this.employeeService.authenticate(inputEmail, inputPassword);
        if (loggedEmployee) {
          console.log(`\n Welcome , ${loggedEmployee.name}!\n`);
          return loggedEmployee;
        }
        console.log('Digite "sair" para encerrar.\n');
      } catch {
        console.log(' Erro de conexão com o banco.');
      }
    }
  }
}