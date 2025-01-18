import { NewTransaction } from "infra/data-access/transaction/transaction.schema";
import { ITransaction } from "../entities/transaction.interface";

export type TransactionsPeriod = "year" | "month";

export interface ITransactionRepository {
	getTransactions(period: TransactionsPeriod): Promise<ITransaction[] | null>;
	saveTransaction(data: NewTransaction): Promise<ITransaction[]>;
	deleteTransactions(): Promise<void>;
}
