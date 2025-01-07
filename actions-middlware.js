const Actions = require("./actions-model");

async function validateActionId(req, res, next) {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    if (!action) {
      return res
        .status(404)
        .json({ message: `Action with id ${id} not found` });
    }
    req.action = action;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to validate action id" });
  }
}

function validateAction(req, res, next) {
  const { description, notes, completed } = req.body;
  if (!description || !notes || completed === undefined) {
    return res.status(400).json({
      message:
        "Project ID, description, notes, and completed status are required",
    });
  }

  if (description.length > 128) {
    return res
      .status(400)
      .json({ message: "Description must be 128 characters or less" });
  }

  next();
}

async function validateProjectId(req, res, next) {
  const { project_id } = req.body;
  try {
    const project = await Actions.getProject(project_id);
    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with id ${project_id} does not exist` });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to validate project id" });
  }
}

module.exports = {
  validateActionId,
  validateAction,
  validateProjectId,
};
