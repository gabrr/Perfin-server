import { ITransaction, TypeTransactionsCategories } from "domain/entities/transaction.interface";
import { openai } from "./openAI";
import { getTransactionsFromFolder } from "./getTransactionsFromFolder";
import { saveToFolder } from "./saveToFolder";

async function fetchCategoryFromAI(
	description: string
): Promise<TypeTransactionsCategories | null> {
	try {
		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "user",
					content: `
						Categorize the following transaction description into one of the categories:
						food, transport, needs, fun, donations, gabrr, se ltda, clothing, renting, home, table and bathroom, dollar expenses.
						
						Description: ${description}
						
						respond with the category only.
						
						If you are not sure, try getting the CNPJ based on the description, so you can have more clues of what category best describes.

						Whenever a transaction has a description that includes those, assign to the category aside.

						"Romaveli" = "renting".
						"Nizer Empreendimentos" = "renting".
						"Selecao Essencial Alimentos" = "mirts".
						"Leticia, my wife" = "needs".
						"Alessandra, my mom" = "donations".
						`,
				},
			],
			max_tokens: 250,
			temperature: 0,
		});

		const category = response.choices.map((choice) => choice.message.content).join(", ") as
			| TypeTransactionsCategories
			| undefined;

		if (
			category &&
			[
				"food",
				"transport",
				"needs",
				"fun",
				"donations",
				"gabrr",
				"mirts",
				"clothing",
				"renting",
				"home, table and bathroom",
				"investing",
			].includes(category.toLowerCase())
		) {
			return category;
		}
		return null;
	} catch (error) {
		console.error("Error fetching category from OpenAI:", error);
		return null;
	}
}

async function categorizeTransactions(
	transactions: Omit<ITransaction, "category">[]
): Promise<ITransaction[]> {
	const categorizedTransactions = await Promise.all(
		transactions.map(async (transaction) => {
			const category = await fetchCategoryFromAI(transaction.description ?? "");
			return {
				...transaction,
				category: category || "food",
			};
		})
	);

	return categorizedTransactions;
}

(async () => {
	const transactions: ITransaction[] = getTransactionsFromFolder() ?? [];

	const result = await categorizeTransactions(transactions);
	saveToFolder(result);
	console.log(result);
})();
