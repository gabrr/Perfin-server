import bodyParser from "body-parser";
import { app, port } from "core/config";
import express from "express";
import router from "routes/routes";
import cors from "cors";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", router);
app.use("/uploads", express.static("./uploads"));

app.listen(port, () => console.log("Listening on port: " + port));
