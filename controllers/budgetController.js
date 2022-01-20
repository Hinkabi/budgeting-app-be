const express = require("express");

const budgetRoutes = express.Router();
const budgetArr = require("../models/budgetData.js");

//Budget Data Array
budgetRoutes.get("/", (req, res) => {
  res.json(budgetArr);
});

budgetRoutes.get("/:index", (req, res) => {
  const { index } = req.params;
  if (budgetArr[index]) {
    res.json(budgetArr[index]);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

//Add individual budget data to last index position on the array
budgetRoutes.post("/", (req, res) => {
  budgetArr.push(req.body);
  res.json(budgetArr[budgetArr.length - 1]);
});

budgetRoutes.delete("/:index", (req, res) => {
  const { index } = req.params;
  if (budgetArr[index]) {
    let removed = budgetArr.splice(index, 1);
    res.json(removed[0]);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

//Updates an entry/log
budgetRoutes.put("/:index", (req, res) => {
  //   let { index } = req.params;
  //   if(budgetArr[index]) {
  //     budgetArr[index] = req.body;
  //     res.status(200).json(budgetArr[index]);
  //   } else {
  //     res.status(404).json({ error: "Not found" });
  //   }

  let { index } = req.params;

  if (!budgetArr[index]) {
    res.status(422).json({
      error: "Not found",
    });
    return;
  }

  let { date, name, amount, from } = req.body;
  if (date && name && amount !== undefined && from) {
    budgetArr[index] = {
      date,
      name,
      amount,
      from,
    };
    res.json(budgetArr[index]);
  } else {
    res.status(422).json({
      error: "Please provide all fields",
    });
  }
});

module.exports = budgetRoutes;
