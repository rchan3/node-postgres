const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const login = require("./login");

app.use(cors());
app.get("/", (req, res) => {
  login
    .checkLogin()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.get("/login", (req, res) => {
  login
    .checkLogin(req.query.username, req.query.pw)
    .then((response) => {
      res.status(200).send(console.log(response));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(console.log("username does not exist"));
      res.status(500).send("username does not exist");
    });
});

app.post("/login", (req, res) => {
  login
    .createLogin(req.body)
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
