const express = require("express");
const router = express.Router();

const {
  validateProjectId,
  validateProject,
  validateUpdateProject,
} = require("./projects-middleware");
const Projects = require("./projects-model");

router.get("/", async (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects || []);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error retrieving projects" });
    });
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

router.put("/:id", validateProjectId, validateUpdateProject, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch(() => {
      res.status(500).json({ message: "Failed to update project" });
    });
});

router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    await Projects.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete project" });
  }
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to get project actions" });
    });
});

module.exports = router;
