const Signup = require("pg").Pool;
const signup = new Signup({
  user: "rachh",
  host: "localhost",
  database: "testdb2",
  password: "rachh",
  port: 5432,
});

const newUser = (user, pw) => {
  return new Promise(function (resolve, reject) {
    //make sure no dupe username
    signup.query(
      "SELECT username from users WHERE NOT EXISTS(SELECT username FROM users WHERE username='" +
        user +
        "')",
      (error, results) => {
        if (error) {
          console.log("error");
          reject(error);
        } else if (results.rows[0] === undefined) {
          resolve(JSON.stringify({ dupe: true }));
        } else {
          signup.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            [user, pw],
            (error, results) => {
              if (error) {
                reject(error);
              }
              resolve(JSON.stringify({ dupe: false }));
            }
          );
        }
      }
    );
  });
};

module.exports = { newUser };
