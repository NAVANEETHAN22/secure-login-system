const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");

const app = express();

// IMPORTANT (for form data)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "authDB"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});


// 🔹 Home Page (UI)
app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>Secure Login</title>
    <style>
      body {
        font-family: Arial;
        background: linear-gradient(to right, #667eea, #764ba2);
        color: white;
        text-align: center;
        padding-top: 50px;
      }
      .container {
        background: white;
        color: black;
        width: 300px;
        margin: auto;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px gray;
      }
      input {
        width: 90%;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        border: 1px solid gray;
      }
      button {
        padding: 10px 20px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      button:hover {
        background: #5a67d8;
      }
    </style>
  </head>

  <body>
    <h1>🔐 Secure Login System</h1>

    <div class="container">
      <h2>Register</h2>
      <form method="POST" action="/register">
        <input name="username" placeholder="Username" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>

    <br>

    <div class="container">
      <h2>Login</h2>
      <form method="POST" action="/login">
        <input name="username" placeholder="Username" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>

  </body>
  </html>
  `);
});


// 🔹 Register
app.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [req.body.username, hash],
    (err) => {
      if (err) return res.send("Error registering user");
      res.send("<h2>✅ User Registered</h2><a href='/'>Go Back</a>");
    }
  );
});


// 🔹 Login
app.post("/login", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE username=?",
    [req.body.username],
    async (err, results) => {
      if (err) return res.send("Error");

      if (results.length === 0)
        return res.send("<h2>❌ User not found</h2><a href='/'>Go Back</a>");

      const valid = await bcrypt.compare(
        req.body.password,
        results[0].password
      );

      if (valid)
        res.send("<h2>✅ Login Success</h2><a href='/'>Go Back</a>");
      else
        res.send("<h2>❌ Wrong Password</h2><a href='/'>Go Back</a>");
    }
  );
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));