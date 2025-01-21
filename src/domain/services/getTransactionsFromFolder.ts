import fs from "fs";
import path from "path";
import { ITransaction } from "domain/entities/transaction.interface";

export function getTransactionsFromFolder(): ITransaction[] | null {
	const transactionsFolder = path.join(process.cwd(), "transactions"); // This path is now relative to the project root
	const transactions: ITransaction[] = [];

	try {
		const files = fs.readdirSync(transactionsFolder);

		for (const file of files) {
			const filePath = path.join(transactionsFolder, file);
			const data = fs.readFileSync(filePath, "utf-8");
			transactions.push(...JSON.parse(data));
		}

		return transactions;
	} catch (error) {
		console.error("Error reading transactions: ", error);
		return null; // Return null in case of an error
	}
}
