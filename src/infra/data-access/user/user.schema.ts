import { date, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: serial("id").primaryKey(),
	username: varchar("username", { length: 50 }).notNull(),
	password: varchar("password", { length: 256 }).notNull(),
	createdAt: date("created_at").defaultNow().notNull(),
	updatedAt: date("updated_at").defaultNow().notNull(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = Array<typeof usersTable.$inferInsert>;
