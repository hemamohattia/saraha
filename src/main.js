import "dotenv/config";
import "./DB/connection.db.js";
import "./app.bootstrap.js";
import express from "express";

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});