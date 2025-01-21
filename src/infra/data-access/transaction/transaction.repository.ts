import { ITransaction } from "domain/entities/transaction.interface";
import {
	ITransactionRepository,
	TransactionsPeriod,
} from "domain/repositories/transaction.repository.interface";
import { getTransactionsFromFolder } from "domain/services/getTransactionsFromFolder";

export class TransactionRepository implements ITransactionRepository {
	async getTransactions(period: TransactionsPeriod): Promise<ITransaction[] | null> {
		const transactions = getTransactionsFromFolder();
		if (!transactions) return null;

		const startDate = new Date(2025, 0, 1);
		const endDate = new Date(2025, 0, 31);

		return transactions
			.filter((transaction) => {
				const transactionDate = new Date(transaction.date);
				return transactionDate >= startDate && transactionDate <= endDate;
			})
			.filter((transaction) => transaction.amount !== 13500) // work around to remove rico card payment
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	}

	async saveTransaction(transactions: ITransaction[]): Promise<ITransaction[]> {
		try {
			return transactions;
		} catch (error) {
			console.error("Error with test insert: ", error);
			return Promise.reject(error);
		}
	}

	async deleteTransactions(): Promise<void> {
		return Promise.resolve();
	}
}
