export interface ITransaction {
  source: "card:rico" | "card:inter" | "account|inter";
  numberOfInstallments: number;
  categoryIcon: string;
  currentInstallment: number;
  description: string;
  date: string;
  type: "DEBIT" | "CREDIT";
  amount: number;
}
