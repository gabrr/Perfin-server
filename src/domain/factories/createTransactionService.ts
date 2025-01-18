// src/domain/factories/transaction.factory.ts
import { TransactionService } from "services/transaction.service";
import { TransactionRepository } from "infra/data-access/transaction/transaction.repository";

export function createTransactionService(): TransactionService {
	const transactionRepository = new TransactionRepository();
	return new TransactionService(transactionRepository);
}
