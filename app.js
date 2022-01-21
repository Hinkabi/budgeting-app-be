const express = require("express");
const app = express();
const budgetController = require("./controllers/budgetController.js");
const cors = require("cors");

app.use(cors())
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Welcome to our budget app Backend");
});

app.use("/transactions", budgetController);

app.get("*", (req, res)=>{
    res.status(404).json({ error: "Page not found" });
})

module.exports = app;