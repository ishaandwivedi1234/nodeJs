const express = require("express");
const db = require("./index");
const app = express();

// const createGenres = dbCreate();
app.use(express.json());
app.post("/api/", async (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).send("Please Set Name ");

  const result = await db.createGenre(name);

  res.send(result);
  console.log("Genres Created Successfully......");
});

app.get("/api/", async (req, res) => {
  const genres = await db.getGenres();
  if (!genres) return res.status(404).send("Not Document Avilable");
  res.send(genres);
});

app.get("/api/:id", async (req, res) => {
  const genres = await db.getGenresById(req.params.id);
  if (!genres) return res.status(404).send("Not Document Avilable");
  res.send(genres);
});

app.put("/api/:id", async (req, res) => {
  const genres = await db.getGenresById(req.params.id);
  if (!genres) return res.status(400).send("Invalid Id");
  const genreEdit = await db.updateGenres(req.params.id, req.body.name);
  if (!genreEdit) return res.status(400).send("invalid Name....");
  res.send(genreEdit);
});

app.delete("/api/:id", async (req, res) => {
  const genres = await db.deleteGenre(req.params.id);

  if (!genres) return res.status(400).send("invalid Id");

  res.send(genres);
});

app.listen(3000, () => console.log("listning to port 30000"));
