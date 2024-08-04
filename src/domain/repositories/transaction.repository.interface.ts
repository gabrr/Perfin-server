import { NewTransaction, Transaction } from "infra/data-access/transaction/transaction.schema";
import { ITransaction } from "../entities/transaction.interface";

export type TransactionsPeriod = "year" | "month";

export interface ITransactionRepository {
	getTransactions(period: TransactionsPeriod): Promise<ITransaction | null>;
	saveTransaction(data: NewTransaction): Promise<Transaction[]>;
	deleteTransactions(): Promise<void>;
}
