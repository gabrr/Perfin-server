import excelToJson from "convert-excel-to-json";
import fs from "fs";
import { parseTransactions } from "./openAI";
import { ITransaction } from "domain/entities/transaction.interface";

export async function normalizeXLSTransactions(filePath: string) {
	const result = excelToJson({
		source: fs.readFileSync(filePath), // fs.readFileSync return a Buffer
	});

	const parsedTrasnactions = await parseTransactions(
		JSON.stringify(result["Extrato"]),
		"account:btg"
	);

	return parsedTrasnactions;
}
