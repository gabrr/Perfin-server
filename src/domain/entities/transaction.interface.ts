export interface ITransaction {
	source: "card:rico" | "card:inter" | "account|inter" | "account:btg";
	numberOfInstallments: number;
	category: string;
	currentInstallment: number;
	description: string;
	date: string;
	type: "DEBIT" | "CREDIT";
	amount: number;
}
