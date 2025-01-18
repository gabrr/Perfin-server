import { client, db } from "./db";
import { usersTable } from "./user/user.schema";

async function seed() {
	await db.insert(usersTable).values({ password: "admin", username: "gabrr" });
}

seed().finally(() => {
	client.end();
});
