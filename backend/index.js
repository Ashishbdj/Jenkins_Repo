require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to RDS");
  }
});

app.get("/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  db.query(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Note added" });
    }
  );
});

app.delete("/notes/:id", (req, res) => {
  db.query(
    "DELETE FROM notes WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Note deleted" });
    }
  );
});

app.listen(process.env.PORT || 5000);
