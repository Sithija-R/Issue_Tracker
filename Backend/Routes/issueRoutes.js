const express = require("express");
const {
  createIssue,
  updateIssue,
  getIssues,
  deleteIssue,
} = require("../Controller/issueController");
const authMiddle = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/create", authMiddle, createIssue);
router.get("/all", getIssues);
router.put("/update", authMiddle, updateIssue);
router.delete("/delete/:id", authMiddle, deleteIssue);

module.exports = router;
