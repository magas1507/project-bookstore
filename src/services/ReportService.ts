import { ReportRepository } from '../repositories/ReportRepository';

export class ReportService {
  private reportRepository: ReportRepository;

  constructor() {
    this.reportRepository = new ReportRepository();
  }

  public async getAvailableBooks() { return this.reportRepository.getAvailableBooks(); }
  public async getBorrowedBooks() { return this.reportRepository.getBorrowedBooks(); }
  public async getBooksByAuthor() { return this.reportRepository.getBooksByAuthor(); }
  public async getLoanCountByBook() { return this.reportRepository.getLoanCountByBook(); }
  public async getClientsWithActiveLoans() { return this.reportRepository.getClientsWithActiveLoans(); }
}