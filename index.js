const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const cors = require("cors");
const login = require("./login");
const signup = require("./signup");
const addscore = require("./addscore");

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
  var messagebird = require("messagebird")(process.env.LIVE_API_KEY, 10000);

  var params = {
    to: req.body.contact.displayName,
    from: process.env.WHATSAPP_CHANNEL_ID,
    type: "text",
    content: {
      text: req.body.message.content.text,
      disableUrlPreview: false,
    },
  };
  console.log("sending message: " + req.body.message.content.text + " to");
  console.log(req.body.contact.displayName);

  //check so bot only replies to user sent messages

  if (req.body.message.direction == "sent") {
    res.send(console.log("message is from operator"));
  } else {
    res.send(console.log("message from user"));
    messagebird.conversations.send(params, function (err, response) {
      if (err) {
        res.send(console.log(err));
      }
      console.log(response);
      res.send(console.log(response));
    });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
