// http:// vidly.com/api/genres

const express = require("express");
const app = express();
const Joi = require("joi");
const genres = require("./Vidly/genres");

// Read The Generes
app.use(express.json());
app.use("/api/genres", genres);
// adding to pipeline

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listining to port ${port}`));
