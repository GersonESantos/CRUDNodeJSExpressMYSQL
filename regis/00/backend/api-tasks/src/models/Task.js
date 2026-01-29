const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  type: String,
  activity: String,
  date: Date,
  by: mongoose.Schema.Types.ObjectId
}, { _id: false });

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: Date,
  priority: String,
  stage: String,
  activities: [ActivitySchema],
  description: String,
  assets: Array,
  links: Array,
  team: Array,
  isTrashed: { type: Boolean, default: false },
  subTasks: Array,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);