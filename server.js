const express = require("express");
const helmet = require("helmet");

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send("Hello world");
});

server.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ message: "Something went wrong, please try again later." });
});

// Build your actions router in /api/actions/actions-router.js

// Build your projects router in /api/projects/projects-router.js

// Do NOT `server.listen()` inside this file!

module.exports = server;
