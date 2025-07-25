const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'open' },
   assignee:{type: String, default: null},
   timestamp: true,
})

module.exports = mongoose.model("Issue", issueSchema);