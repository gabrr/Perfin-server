import fs from "fs";
import { ITransaction } from "domain/entities/transaction.interface";
import {
	ITransactionRepository,
	TransactionsPeriod,
} from "domain/repositories/transaction.repository.interface";
import path from "path";

export class TransactionRepository implements ITransactionRepository {
	async getTransactions(period: TransactionsPeriod): Promise<ITransaction[] | null> {
		const transactionsFolder = path.join(__dirname, "../../../../transactions"); // Update this path based on your structure
		const transactions: ITransaction[] = [];

		try {
			const files = fs.readdirSync(transactionsFolder);

			for (const file of files) {
				const filePath = path.join(transactionsFolder, file);
				const data = fs.readFileSync(filePath, "utf-8");
				transactions.push(...JSON.parse(data));
			}

			return transactions;
		} catch (error) {
			console.error("Error reading transactions: ", error);
			return null; // Return null in case of an error
		}
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
