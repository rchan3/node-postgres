const { json } = require("express/lib/response");
const { password } = require("pg/lib/defaults");

const Login = require("pg").Pool;
const login = new Login({
  user: "rachh",
  host: "localhost",
  database: "testdb2",
  password: "rachh",
  port: 5432,
});

const checkLogin = (user, pw) => {
  return new Promise(function (resolve, reject) {
    //make sure username is valid
    login.query(
      "SELECT username FROM users WHERE username= '" + user + "'",
      (error, results) => {
        if (error) {
          reject(error);
        }
        //if username valid, then check password
        login.query(
          "SELECT password FROM users where username='" + user + "'",
          (error, results) => {
            if (error) {
              reject(error);
            } else if (pw === results.rows[0].password) {
              resolve(true);
            }
            resolve(false);
          }
        );
      }
    );
  });
};
const createLogin = (body) => {
  return new Promise(function (resolve, reject) {
    const { username, password } = body;
    login.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, password],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new user has been added added: ${results.rows[0]}`);
      }
    );
  });
};

module.exports = {
  checkLogin,
  createLogin,
};
