import { normalizeCSVTransactions } from "domain/services/normalizeCSVTransactions";
import { normalizePDFTransactions } from "domain/services/normalizePDFTransactions";
import { normalizeXLSTransactions } from "domain/services/normalizeXLSTransactions";
import { saveToFolder } from "domain/services/saveToFolder";
import { NextFunction, Request, Response } from "express";

export const transactionUpload = async (req: Request, _: Response, next: NextFunction) => {
	if (!req.file) {
		return next();
	}

	const fileExtension = req.file.mimetype;

	/**
	 * There will be multiple strategies for each company and
	 * each of the data source.
	 */

	if (fileExtension === "text/csv") {
		const transactions = await normalizeCSVTransactions(req.file.path, req.body.source);
		req.body.transactions = transactions;
	}

	if (fileExtension === "application/pdf") {
		const transactions = await normalizePDFTransactions(req.file.path);
		req.body.transactions = transactions;
	}

	if (fileExtension === "application/vnd.ms-excel") {
		const transactions = await normalizeXLSTransactions(req.file.path);
		req.body.transactions = transactions;
	}

	saveToFolder(req.body.transactions, req.body.source);

	return next();
};
