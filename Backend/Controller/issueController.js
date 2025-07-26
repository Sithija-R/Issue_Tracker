const mongoose = require("mongoose");
const Issue = require("../Models/issues");

const createIssue = async ( req, res) => {
  const { title, description, assignee, status, priority } = req.body;
  try {
    const newIssue = new Issue({
      title,
      description,
      assignee,
      status,
      priority,
    });
    await newIssue.save();
    res
      .status(201)
      .json({ message: "Issue created successfully", issue: { ...newIssue._doc, id: newIssue._id }});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating issue", error: error.message });
  }
};

const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    const formattedIssues = issues.map((issue) => ({
      ...issue._doc,
      id: issue._id,
    }));
    return res
      .status(201)
      .json({ message: "Issue fetched successfully", issue : formattedIssues });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateIssue = async (req, res) => {
  try {
    const { id, title, description, assignee, status, priority } = req.body;
    const issue = await Issue.findByIdAndUpdate(
      id,
      { title, description, assignee, status, priority },
      { new: true }
    );
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    return res
      .status(201)
      .json({ message: "Issue update successfully", issue: { ...issue._doc, id: issue._id } });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteIssue = async (req, res) => {
  try {
    const id = req.params.id;
    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    return res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createIssue,
  updateIssue,
  getIssues,
  deleteIssue,
};
