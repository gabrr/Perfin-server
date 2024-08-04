import db from "infra/data-access/db";
import { ITransaction } from "domain/entities/transaction.interface";
import {
	ITransactionRepository,
	TransactionsPeriod,
} from "domain/repositories/transaction.repository.interface";
import {
	NewTransaction,
	Transaction,
	transactionsTable,
} from "infra/data-access/transaction/transaction.schema";

export class TransactionRepository implements ITransactionRepository {
	async getTransactions(period: TransactionsPeriod): Promise<ITransaction | null> {
		return Promise.resolve(null);
	}

	async saveTransaction(transactions: NewTransaction): Promise<Transaction[]> {
		console.log(transactions);

		try {
			return db.insert(transactionsTable).values(transactions).returning()

		} catch (error) {
			console.error(error)
			return Promise.reject(error)
		}
	}

	async deleteTransactions(): Promise<void> {
		return Promise.resolve();
	}
}
