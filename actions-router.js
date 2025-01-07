const express = require("express");
const {
  validateActionId,
  validateAction,
  validateProjectId,
} = require("./actions-middleware");
const Actions = require("./actions-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();
    res.json(actions || []);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving actions" });
  }
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateAction, async (req, res) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.status(201).json(newAction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create action" });
  }
});

router.put("/:id", validateActionId, validateAction, async (req, res) => {
  try {
    const updatedAction = await Actions.update(req.params.id, req.body);
    res.status(200).json(updatedAction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update action" });
  }
});

router.delete("/:id", validateActionId, async (req, res) => {
  try {
    await Actions.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete action" });
  }
});

module.exports = router;
