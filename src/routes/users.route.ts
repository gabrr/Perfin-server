import { Router } from "express";
import pool from "infra/data-access/db";

const usersRoutes = Router();

usersRoutes.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default usersRoutes;
