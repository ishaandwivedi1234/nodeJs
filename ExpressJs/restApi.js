const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json()); // So that we can acess body params

// local Database For Demonstration
const courses = [
  { id: 1, name: "Ishaan" },
  { id: 2, name: "RamJi" },
  { id: 3, name: "ShyamJi" },
];
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  // 404 is when object not found
  if (!course) res.status(404).send("The Course Not Found ");
  else res.send(course);
});
//create a course
app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) res.status(400).send("Name Too Short");
  else {
    let course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    courses.push(course);
    res.send(course);
  }
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Resourse Not Found !");
    return;
  }
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error);
  } else {
    let course = {
      name: req.body.name,
    };
    courses.push(course);

    res.send(course);
  }
});

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening To Port ${3000}`));
