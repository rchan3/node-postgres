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
    login.query(
      "SELECT username FROM users WHERE username= '" + user + "'",
      (error, results) => {
        if (error) {
          reject(error);
        } else if (results.rows[0] === undefined) {
          loggedIn = undefined;
        }
        //make sure username is correct
        else {
          login.query(
            "SELECT password FROM users where username='" + user + "'",
            (error, results) => {
              if (error) {
                reject(error);
              } else if (pw === results.rows[0].password) {
                resolve(JSON.stringify({ loggedIn: true }));
              } else {
                resolve(JSON.stringify({ loggedIn: false }));
              }
            }
          );
        }
      }
    );
  });
};

module.exports = {
  checkLogin,
};
