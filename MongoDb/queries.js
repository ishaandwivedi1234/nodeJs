const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/user")
  .then(() => console.log("Connected..."))
  .catch((err) => console.error(error));

// reading database
const user_schema = mongoose.Schema({
  username: String,
  password: String,
});

const User = new mongoose.model("users", user_schema);
const user = new User();

async function findUser() {
  const user = await User.find({ username: "ishaan" }).select({
    id: 1,
    password: 1,
  });
  console.log(user);
}
findUser();
