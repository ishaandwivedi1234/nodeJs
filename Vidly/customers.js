const express = require("express");
const route = require("./customerApi");

const app = express();

app.use(express.json());
app.use("/api/customer", route);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listning to port ${port}.....`));
