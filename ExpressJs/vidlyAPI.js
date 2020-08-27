// http:// vidly.com/api/generes

const express = require("express");
const app = express();
const Joi = require("joi");
// Read The Generes
app.use(express.json());

// Local Database

const genres = [
  { id: 1, name: "horror" },
  { id: 2, name: "comedy" },
  { id: 3, name: "thriller" },
];

// GET API For genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  // check if id exists
  const genres_res = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genres_res) {
    res.status(404).send("Not Found!");
  }
  res.send(genres_res);
});

// POST API for genres
app.post("/api/genres/", (req, res) => {
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

app.put("/api/genres/:id", (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listining to port ${port}`));

// DELETE API

app.delete("/api/genres/:id", (req, res) => {
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
