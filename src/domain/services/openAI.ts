import { ITransaction } from "domain/entities/transaction.interface";
import OpenAI from "openai";
const openai = new OpenAI({
	organization: process.env.OPENAI_ORGANIZATION,
	apiKey: process.env.OPENAI_API_KEY,
	project: process.env.OPENAI_PROJECT,
});

export async function parseTransactions(unstructuredText: string, source: ITransaction["source"]) {
	const prompt = `Extract and normalize the following unstructured data into an array of JSON objects matching this TypeScript interface:

interface ITransaction {
  source: ${source};
  numberOfInstallments: number;
  category: string;
  currentInstallment: number;
  description: string;
  date: string;
  type: "DEBIT" | "CREDIT";
  amount: number;
}

If the source is account:btg, only consider the ones with "-".
If the source is card:rico, ignores the ones with "-".

Unstructured Data:
${unstructuredText}

Output strictly as JSON array. Don't add \`\`\`json. You should open close properly. [{ ...properties }, { ...properties }]`;

	const response = await openai.chat.completions.create({
		model: "gpt-4o",
		messages: [{ role: "system", content: prompt }],
		max_tokens: 5000,
		temperature: 0,
	});

	const jsonString = response.choices[0].message.content ?? "{}";
	const structuredData = JSON.parse(jsonString);
	return structuredData;
}
