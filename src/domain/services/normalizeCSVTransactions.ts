import { ITransaction } from "domain/entities/transaction.interface";
import { parseCsv } from "utils/csvParser";

export interface CsvTransaction {
	data: string;
	estabelecimento: string;
	portador: string;
	valor: string;
	parcela: string;
}

function parseCurrency(value: string): number {
	const cleanedValue = value
		.replace(/R\$\s?/, "")
		.replace(/\./g, "")
		.replace(",", ".");
	const amount = parseFloat(cleanedValue);
	return value.includes("-") ? 0 : amount;
}

function parseInstallments(parcela: string): {
	current: number;
	total: number;
} {
	if (!parcela) return { current: 0, total: 0 };

	const [current, total] = parcela.split(" de ").map(Number);
	return { current: current ? current : 0, total: total ? total : 0 };
}

export function normalizeTransaction(
	raw: CsvTransaction,
	source: ITransaction["source"]
): ITransaction {
	const dateRegex = /(\d{2}\/\d{2}\/\d{4})/;
	const date = JSON.stringify(raw).match(dateRegex)?.at(0) ?? "";
	const [day, month, year] = date.split("/");
	const dateDbStyle = `${year}-${month}-${day}`;

	const { current, total } = parseInstallments(raw.parcela);

	return {
		source,
		numberOfInstallments: total,
		category: "",
		currentInstallment: current,
		description: raw.estabelecimento,
		date: dateDbStyle,
		type: "CREDIT",
		amount: parseCurrency(raw.valor),
	};
}

export async function normalizeCSVTransactions(
	filePath: string,
	source: ITransaction["source"]
): Promise<ITransaction[]> {
	const rawTransactions = await parseCsv<CsvTransaction>(filePath);
	return rawTransactions.map((transaction) => normalizeTransaction(transaction, source));
}
