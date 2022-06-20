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
  return new Promise(function (resolve, reject) {
    messagebird.conversations.send(params, function (err, response) {
      if (err) {
        console.log("error");
        reject(err);
      }
      console.log("sending a response...");
      resolve(response);
    });
  });
};

module.exports = { echo };
