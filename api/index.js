const express = require("express");
const app = express();
const cors = require("cors");
const Transaction = require("./models/transactions");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/api/test", async (req, res) => {
  res.send("hello");
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, description, datetime, price } = req.body;
  const transaction = await Transaction.create({
    name,
    description,
    datetime,
    price,
  });
  console.log(transaction);
  res.json({ transaction });
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find({});
  console.log(transactions);
  res.json(transactions);
});

app.listen(4000, () => {
  console.log("app listening");
});

module.exports = app;
