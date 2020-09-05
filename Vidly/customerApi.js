const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
/*
_id,isGold,name,phone
*/
try {
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => console.log("connected to database .. ... "))
    .catch((err) => console.error(err));
} catch (err) {
  console.log(err);
}

const Customer = mongoose.model(
  "customers",
  mongoose.Schema({
    isGold: { type: Boolean, required: true },
    name: { type: String, required: true },
    phone: { type: String, minlength: 10, maxlength: 10, required: true },
  })
);

route.post("/", async (req, res) => {
  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  try {
    const customerResult = await customer.save();
    console.log("saved  to database");
    res.send(customerResult);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

route.get("/", async (req, res) => {
  const customers = await Customer.find({});
  if (!customers) return res.status(404).send("No Entry Found");

  res.send(customers);
});

route.get("/:id", async (req, res) => {
  const customers = await Customer.find({ _id: req.params.id });
  if (customers.length === 0) return res.status(404).send("No Entry Found");

  res.send(customers);
});

route.put("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(400).send("please verify the id");
  customer = await customer.set({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  const newCustomer = await customer.save();
  res.send(newCustomer);
});

route.delete("/:id", async (req, res) => {
  const result = await Customer.findByIdAndRemove(req.params.id);
  if (!result) return res.status(400).send("Please Varufy Your Id ...  .. .. ");
  res.send(result);
});

module.exports = route;
