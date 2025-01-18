import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export const client = postgres("postgres://postgres:postgres@127.0.0.1:5432/perfindb");
export const db = drizzle(client, { schema, logger: true });
