const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, "data", "users.json");

function getUsers() {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
}

app.get("/api/users", (req, res) => {
  try {
    const users = getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send("Error reading user data");
  }
});

app.get("/api/users/:id", (req, res) => {
  try {
    const users = getUsers();
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error reading user data");
  }
});

app.put("/api/users/:id", (req, res) => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...req.body };
      fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
      res.json(users[userIndex]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error updating user data");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
