import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/infra/data-access/schema.ts",
	out: "./.migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: "postgres://postgres:postgres@127.0.0.1:5432/perfindb",
	},
});
