const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("connected...."));

const genresSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Genres = new mongoose.model("genres", genresSchema);
// create A Genres......
async function createGenre(genres) {
  const genre = new Genres({
    name: genres,
  });
  const res = genre.save();
  return res;
}

// Get all genres........

async function getGenres() {
  const genres = await Genres.find({});
  console.log("geting genres...");
  console.log(genres);
  return genres;
}

async function getGenresById(id) {
  try {
    const genres = await Genres.find({ _id: id });
    return genres;
  } catch (err) {
    return 0;
  }
}
async function updateGenres(id, newName) {
  const genre = await Genres.findById(id);
  if (!genre) return genre;
  const updatedGenre = await genre.set({ name: newName });
  genre.save();
  return updatedGenre;
}

async function deleteGenre(id) {
  try {
    const deletedGenres = await Genres.findByIdAndRemove(id);
    return deletedGenre;
  } catch (err) {
    return 0;
  }
}

module.exports = {
  createGenre,
  getGenres,
  getGenresById,
  updateGenres,
  deleteGenre,
};
