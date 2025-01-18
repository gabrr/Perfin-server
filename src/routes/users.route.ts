import { Router } from "express";
import { db } from "infra/data-access/db";
import { usersTable } from "infra/data-access/user/user.schema";

const usersRoutes = Router();

usersRoutes.get("/", async (req, res) => {
	try {
		const users = await db.select().from(usersTable).execute();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: "Error fetching users", error });
	}
});

export default usersRoutes;
