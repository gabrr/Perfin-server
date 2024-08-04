import express from "express";
import dotenv from "dotenv";
import pool from "infra/data-access/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

export { app, port, pool };
