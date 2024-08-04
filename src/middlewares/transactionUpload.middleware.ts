import { normalizeTransactions } from "domain/services/transactionNormalizer";
import { NextFunction, Request, Response } from "express";

export const transactionUpload = async (req: Request, _: Response, next: NextFunction) => {
  if (!req.file) {
    return next();
  }

  const fileExtension = req.file.mimetype;

  if (fileExtension === "text/csv") {
    const transactions = await normalizeTransactions(req.file.path);
    req.body.transactions = transactions;
  }

  return next();
};
