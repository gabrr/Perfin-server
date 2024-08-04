import { ITransaction } from "domain/entities/transaction.interface";

export const createTransaction = (transaction: ITransaction) => {
  return {
    ...transaction,
  };
};
