import { Router } from "express";
import transactionsRoutes from "./transactions.route";
import usersRoutes from "./users.route";

const router = Router();

router.use("/transactions", transactionsRoutes);
router.use("/users", usersRoutes);

export default router;
