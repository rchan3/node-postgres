require("dotenv").config();
var messagebird = require("messagebird")(process.env.LIVE_API_KEY);

const echo = (client, message) => {
  var params = {
    to: client,
    from: process.env.WHATSAPP_CHANNEL_ID,
    type: "text",
    content: {
      text: message,
      disableUrlPreview: false,
    },
  };

  messagebird.conversations.send(params, function (err, response) {
    if (err) {
      return console.log(err);
    }
    console.log(response);
  });

  return new Promise(function (resolve, reject) {
    messagebird.conversations.send(params, function (err, response) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(response);
      resolve(response);
    });
  });
};

module.exports = { echo };
