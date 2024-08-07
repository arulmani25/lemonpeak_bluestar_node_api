const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const filterSchema = new mongoose.Schema({
    filter_name: { type: String }
});
filterSchema.plugin(timestamps);
const FilterModel = mongoose.model('filter', filterSchema);

module.exports = FilterModel;
