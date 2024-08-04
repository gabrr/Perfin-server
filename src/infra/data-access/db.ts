import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
	user: "postgres",
	password: "postgres",
	host: process.env.DATABASE_URL,
});

client.connect((error: Error) => {
	if (error) {
		console.error("Unexpected error on idle client", error);
		process.exit(-1);
	}

	console.log("Connected to the PostgreSQL database");
});

const db = drizzle(client);

export default db;
