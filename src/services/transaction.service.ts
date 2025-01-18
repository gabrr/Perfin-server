import { ITransaction } from "domain/entities/transaction.interface";
import { ITransactionRepository } from "domain/repositories/transaction.repository.interface";

export class TransactionService {
	constructor(private transactionRepository: ITransactionRepository) {}

	async getTransactions(): Promise<ITransaction[] | null> {
		return this.transactionRepository.getTransactions("year");
	}

	async saveTransaction(data: ITransaction[]): Promise<ITransaction[]> {
		return this.transactionRepository.saveTransaction(data);
	}

	async deleteTransactions(): Promise<void> {
		return this.transactionRepository.deleteTransactions();
	}
}
