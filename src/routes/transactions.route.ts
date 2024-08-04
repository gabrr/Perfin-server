import { createTransactionService } from "domain/factories/createTransactionService";
import { Router } from "express";
import { transactionUpload } from "middlewares/transactionUpload.middleware";
import uploader from "middlewares/uploader.middleware";

const transactionsRoutes = Router();
const transactionService = createTransactionService();

transactionsRoutes.get("/transactions", async () => await transactionService.getTransactions());

transactionsRoutes.post(
	"/uploads",
	uploader.single("file"),
	transactionUpload,
	async (req, res) => {
		try {
			const result = await transactionService.saveTransaction(req.body.transactions);
			res.status(200).json(result.rows);

		} catch (error) {
			res.status(500).json({ error: "Failed to upload file", code: 500 });
		}
	}
);

transactionsRoutes.delete("/transactions", async (req, res) => {
	try {
		await transactionService.deleteTransactions();
		res.status(200).json({ message: "Transaction deleted successfully" });

	} catch (error) {
		res.status(500).json({ error: "Failed to delete transaction", code: 500 });
	}
});


export default transactionsRoutes;
