const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const login = require("./login");
const signup = require("./signup");

app.use(cors());

app.get("/login", (req, res) => {
  login
    .checkLogin(req.query.username, req.query.pw)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/signup", (req, res) => {
  signup
    .newUser(req.query.username, req.query.pw)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
