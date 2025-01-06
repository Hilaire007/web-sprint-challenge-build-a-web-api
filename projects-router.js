const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Projects endpoint working!" });
});

const {
  validateProjectId,
  validateProject,
  validateUpdateProject,
} = require("./projects-middleware");
const Projects = require("./projects-model");

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get projects" });
  }
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", validateProject, async (req, res) => {
  try {
    const newProject = await Projects.insert(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create project" });
  }
});

router.put(
  "/:id",
  validateProjectId,
  validateUpdateProject,
  async (req, res) => {
    try {
      const updatedProject = await Projects.update(req.params.id, req.body);
      res.status(200).json(updatedProject);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update project" });
    }
  }
);

router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    await Projects.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete project" });
  }
});

router.get("/:id/actions", validateProjectId, async (req, res) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    res.status(200).json(actions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get project actions" });
  }
});

module.exports = router;
