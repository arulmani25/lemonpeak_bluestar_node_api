const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const fieldTypeSchema = new mongoose.Schema({
    field_name: { type: String }
});
fieldTypeSchema.plugin(timestamps);
const FieldTypeModel = mongoose.model('fieldtype', fieldTypeSchema);

module.exports = FieldTypeModel;
