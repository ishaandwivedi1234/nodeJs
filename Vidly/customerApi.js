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
    phone: { type: String, min: 10, max: 10, required: true },
  })
);

const schema = {
  isGold: Joi.boolean().required(),
  name: Joi.string().required(),
  phone: Joi.string().min(10).max(10),
};

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
    res.status(400).send(err[0]);
  }
});

module.exports = route;
