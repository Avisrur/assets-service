const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const db = require("./config/knex-config");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const errorHandler = require("./utils/error-handler");

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.set("db", db);

app.use("/assets", require("./controllers/assets-controller"));
app.use("/auth", require("./controllers/auth-controller"));

app.use(errorHandler);

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
