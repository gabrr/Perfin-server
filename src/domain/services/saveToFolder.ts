import { ITransaction } from "domain/entities/transaction.interface";
import fs from "fs";

export function saveToFolder(
	transactions: any[],
	source: ITransaction["source"] | "categorized" = "categorized"
) {
	const outputFilePath = `./transactions/transactions-${source}.json`;
	fs.mkdirSync("./transactions", { recursive: true });
	fs.writeFileSync(outputFilePath, JSON.stringify(transactions, null, 2), "utf-8");
}
