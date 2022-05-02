const Addscore = require("pg").Pool;
const addscore = new Addscore({
  user: "rachh",
  host: "localhost",
  database: "testdb2",
  password: "rachh",
  port: 5432,
});

const addScore = (score, user) => {
  return new Promise(function (resolve, reject) {
    console.log("score is " + score + " user is " + user);
    addscore.query(
      "INSERT INTO scores(username, score) VALUES ($1, $2)",
      [user, score],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.stringify(`sent a score of ${score}`));
        }
      }
    );
  });
};

module.exports = { addScore };
