const mongoose = require("mongoose");
const { string } = require("joi");

mongoose
  .connect("mongodb://localhost/user")

  .then(() => console.log("connect to MongoDb..."))
  .catch((err) => console.error("could Not connect to Mongodb.."));

const user_schema = mongoose.Schema({
  username: String,
  password: String,
});

const User = new mongoose.model("user", user_schema);

const newUser = User({
  username: "danverer",
  password: "rtudelly1234",
});
async function createuser() {
  const res = await newUser.save();
  console.log(res);
}

createuser();
