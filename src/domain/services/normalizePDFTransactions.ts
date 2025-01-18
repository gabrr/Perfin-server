import fs from "fs";
import PdfParse from "pdf-parse";
import { parseTransactions } from "./openAI";

function chunkText(text: string, chunkSize: number) {
	const chunks: string[] = [];
	for (let i = 0; i < text.length; i += chunkSize) {
		chunks.push(text.slice(i, i + chunkSize));
	}
	return chunks;
}

// Function to read and parse the PDF
async function extractTextFromPDF(pdfFilePath) {
	const pdfBuffer = fs.readFileSync(pdfFilePath);
	const data = await PdfParse(pdfBuffer);
	return data.text;
}

function extractTransactionsSection(unstructuredText) {
	const startKeyword = "Despesas da fatura";
	const endKeyword = "Limites";

	const startIndex = unstructuredText.indexOf(startKeyword);
	const endIndex = unstructuredText.indexOf(endKeyword);

	if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
		return unstructuredText.slice(startIndex, endIndex).trim();
	}

	throw new Error("Transactions section not found in the provided text.");
}

// Main Execution Function
export async function normalizePDFTransactions(pdfPath) {
	try {
		// Step 1: Extract text from the PDF
		const unstructuredText = await extractTextFromPDF(pdfPath);

		const transactionsText = extractTransactionsSection(unstructuredText);

		const chunkSize = 1000; // Adjust size based on model limits
		const chunks = chunkText(transactionsText, chunkSize);

		let transactions: string[] = [];
		for (const chunk of chunks) {
			const parsedChunk = await parseTransactions(chunk);
			transactions = transactions.concat(parsedChunk);
		}

		return transactions.flat();
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}
