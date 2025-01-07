const Projects = require("./projects-model");

async function validateProjectId(req, res, next) {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with id ${id} not found` });
    }
    req.project = project;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to validate project id" });
  }
}

function validateProject(req, res, next) {
  const { name, description, completed } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      message: "Name and description are required",
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      message: "Completed must be a boolean",
    });
  }

  next();
}

function validateUpdateProject(req, res, next) {
  const { name, description, completed } = req.body;

  if (!name || !description || completed === undefined) {
    return res.status(400).json({
      message: "Name, description, and completed status are required",
    });
  }

  next();
}

module.exports = {
  validateProjectId,
  validateProject,
  validateUpdateProject,
};
