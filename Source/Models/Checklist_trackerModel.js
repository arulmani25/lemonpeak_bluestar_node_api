const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const checklistTrackerSchema = new mongoose.Schema({
    equipment_tag: { type: String },
    day_of_month: { type: Number }
});
checklistTrackerSchema.plugin(timestamps);

const Checklist_trackerModel = mongoose.model('checklist_tracker', checklistTrackerSchema);

module.exports = Checklist_trackerModel;
