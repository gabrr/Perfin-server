import { integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const transactionTypeEnum = pgEnum('transaction_type', ['DEBIT', 'CREDIT']);

export const transactionsTable = pgTable('transactions', {
	id: serial('id').primaryKey(),
	source: varchar('source', { length: 50 }),
	numberOfInstallments: integer('number_of_installments'),
	categoryIcon: varchar('category_icon', { length: 256 }),
	currentInstallment: integer('current_installment'),
	description: varchar('description', { length: 256 }),
	date: varchar('date', { length: 10 }),
	type: transactionTypeEnum('type').notNull(),
	amount: integer('amount').notNull(),
});

export type Transaction = typeof transactionsTable.$inferSelect;
export type NewTransaction = Array<typeof transactionsTable.$inferInsert>;

