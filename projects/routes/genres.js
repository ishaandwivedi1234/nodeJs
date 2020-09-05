const express = require("express");
const routes = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

mongoose
  .connect("mongodb://localhost/vidly", { useNewUrlParser: true })
  .then(() => {
    console.log("connect to database.......");
  })
  .catch((err) => console.log(err));

const genresSchema = {
  name: { type: String, required: true, min: 3, max: 255 },
};
const Genres = new mongoose.model("genres", genresSchema);

routes.post("/", async (req, res) => {
  const genreSchema = {
    name: Joi.string().min(3).max(255),
  };
  const { error } = Joi.validate(req.body, genreSchema);
  if (error) return res.status(400).send(error.message);

  const genre = new Genres({
    name: req.body.name,
  });

  const result = await genre.save();

  res.send(result);
});

routes.get("/", async (req, res) => {
  const genres = await Genres.find({});
  if (!genres) return res.status(404).send("No Genres Found !! ");
  res.send(genres);
});

routes.get("/:id", async (req, res) => {
  const genre = await Genres.findById(req.params.id);
  if (!genre) return res.status(404).send("No Genre Found !! Please Check Id ");
  else {
    res.send(genre);
  }
});

routes.put("/:id", async (req, res) => {
  let genre = await Genres.findById(req.params.id);
  if (!genre) {
    res.status(400).status("Please Check Id...");
  } else {
    genre = await genre.set({ name: req.body.name });
    const result = await genre.save();
    res.send(genre);
  }
});

routes.delete("/:id", async (req, res) => {
  const genre = await Genres.findByIdAndRemove(req.params.id);
  if (!genre) {
    res.status(404).send("Please Check Id....");
  } else {
    res.send(genre);
  }
});

module.exports = routes;
