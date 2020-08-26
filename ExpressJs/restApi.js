const express = require("express");
const app = express();
// local Database For Demonstration
const courses = [
  { id: 1, name: "Ishaan" },
  { id: 2, name: "RamJi" },
  { id: 3, name: "ShyamJi" },
];

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  // 404 is when object not found
  if (!course) res.status(404).send("The Course Not Found ");
  else res.send(course);
});
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening To Port ${3000}`));
