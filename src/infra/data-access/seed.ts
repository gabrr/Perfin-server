import { client, db } from "./db";
import { transactionsTable } from "./transaction/transaction.schema";
import { usersTable } from "./user/user.schema";

async function seed() {
	await db.insert(usersTable).values({ password: "admin", username: "gabrr" });
}

seed().finally(() => {
	client.end();
});
