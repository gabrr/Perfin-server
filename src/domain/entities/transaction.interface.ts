export type TypeTransactionsCategories =
	| "food"
	| "transport"
	| "needs"
	| "fun"
	| "donations"
	| "gabrr"
	| "mirts"
	| "clothing"
	| "renting"
	| "home, table and bathroom"
	| "investing";

export interface ITransaction {
	source: "card:rico" | "card:inter" | "account:inter" | "account:btg";
	numberOfInstallments: number;
	category: TypeTransactionsCategories;
	currentInstallment: number;
	description: string;
	date: string;
	type: "DEBIT" | "CREDIT";
	amount: number;
}
