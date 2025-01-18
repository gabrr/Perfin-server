import { integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const transactionTypeEnum = pgEnum("transaction_type", ["DEBIT", "CREDIT"]);

export const transactionsTable = pgTable("transactions", {
	id: serial("id").primaryKey(),
	source: varchar("source", { length: 50 }),
	numberOfInstallments: integer("number_of_installments"),
	categoryIcon: varchar("category_icon", { length: 256 }),
	currentInstallment: integer("current_installment"),
	description: varchar("description", { length: 256 }),
	date: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	type: transactionTypeEnum("type").notNull(),
	amount: integer("amount").notNull(),
});

export const usersTable = pgTable("users", {
	id: serial("id").primaryKey(),
	username: varchar("username", { length: 50 }).notNull(),
	password: varchar("password", { length: 256 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
