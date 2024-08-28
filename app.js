import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: "config/.env" });

const PORT = process.env.PORT;
const { MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("DB Connected !");
  })
  .catch((err) => console.log(err));
app.listen(PORT, () => {
  console.log(`Server running of port ${PORT}`);
});
