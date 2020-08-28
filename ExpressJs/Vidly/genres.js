const express = require("express");
const router = express.Router();
const Joi = require("joi");
const genres = [
  { id: 1, name: "horror" },
  { id: 2, name: "glukamole" },
  { id: 3, name: "thriller" },
];

// GET API For genres
router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  // check if id exists
  const genres_res = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genres_res) {
    res.status(404).send("Not Found!");
  }
  res.send(genres_res);
});

// POST API for genres
router.post("/", (req, res) => {
  const schema = {
    name: Joi.string().required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) res.status(400).send("Bad Request, Please Check The Name");
  const genres_new = { id: genres.length + 1, name: req.body.name };
  genres.push(genres_new);
  res.send(genres_new);
});

// PUT API for updating

router.put("/:id", (req, res) => {
  //  validate

  const isValid = genres.find((g) => g.id === parseInt(req.params.id));
  if (!isValid) {
    res.status(404).send("Invalid Id Of Genres");
  } else {
    // validate the data
    const schema = {
      name: Joi.string().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      res.status(400).send("Bad Request , Please Check The Name...");
    } else {
      // update the database
      const _genres = genres.find((g) => g.id === parseInt(req.params.id));
      _genres.name = req.body.name;
      res.send(_genres);
    }
  }
});

// DELETE API

router.delete("/:id", (req, res) => {
  // check id it exists
  const _genres = genres.find((g) => g.id == parseInt(req.params.id));
  if (!_genres) {
    res.status(404).send("Resourse Not Found");
  } else {
    const index = genres.indexOf(_genres);
    genres.slice(index, 1);
    res.send(_genres);
  }
});

module.exports = router;
