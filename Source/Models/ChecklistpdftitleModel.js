const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const checklistPdfTitleSchema = new mongoose.Schema({
    type: { type: String },
    title: { type: String }
});
checklistPdfTitleSchema.plugin(timestamps);

const ChecklistpdftitleModel = mongoose.model('checklist_pdf_title', checklistPdfTitleSchema);

module.exports = ChecklistpdftitleModel;
