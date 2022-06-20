const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const cors = require("cors");
const login = require("./login");
const signup = require("./signup");
const addscore = require("./addscore");
const webhook = require("./webhook");
const { response } = require("express");
require("dotenv").config();

//THE HEROKU POSTGRES
//psql -h ec2-3-224-164-189.compute-1.amazonaws.com -d ddddcipethsre -U qptwhggbkfwfpd -W

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("status ok");
});

app.get("/login", (req, res) => {
  //add highscore function + response object to send
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

app.post("/addscore", (req, res) => {
  addscore
    .addScore(req.query.userscore, req.query.username)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/webhook", (req, res) => {
  webhook
    .echo(req.body.contact.displayName, req.body.message.content.text)
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
