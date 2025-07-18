const express = require("express");
const app = express();
const PORT = 3000;

// Middleware: Enable JSON request body parsing
app.use(express.json());

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Existing demonstration route (DO NOT MODIFY)
app.get("/", (req, res) => {
  res.send("Express Routing Lab - Home Page");
});

// 🎯 STUDENT TASKS: Add your routes below this line
// ------------------------------------------------

// Task 1: Health Check Endpoint
// CREATE GET /health

app.get("/health", (req, res) => {
  res.status(200).send({
    status: "ok",
  });
});

// TASK 2: User Routes
// 1. get id from req.params
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  res.status(200).json(users);
});

// 2. find user in array
app.get("/users/:id", (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  const userID = parseInt(req.params.id);
  const user = users.find((u) => u.id === userID);
  // 3. Return user or 404 if not found
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
});

// TASK 3: Message Submission

// 1. Get text from req.body
app.post("/messages", (req, res) => {
  const { text } = req.body;

  // 2. Validate text exists
  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ error: "Text is required" });
  }
  // 3. Return JSON with:
  //    - Generated ID (number)
  const message = {
    id: Date.now(),
    //    - Original text
    text: text.trim(),
    //    - status: "received"
    status: "received",
  };

  res.status(201).json(message);
});
app.use(express.json());
app.post("/messages", (req, res) => {
  const text = req.body;
  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "nothing written here" });
  }
  const message = {
    id: Date.now(),
    text: text,
    status: "received",
  };

  res.status(201).json(text)({});
});
app.post("/messages", (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ error: "Text is required" });
  }

  const message = {
    id: `${Date.now()}`,
    text: text.trim(),
    status: "received",
  };

  res.status(201).json(message);
});

// ------------------------------------------------
// END OF STUDENT TASKS

// 🚫 Do not modify below this line
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = { app };
