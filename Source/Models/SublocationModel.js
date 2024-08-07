const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const subLocationSchema = new mongoose.Schema({
    sub_location: { type: String },
    is_active: { type: Boolean, default: true }
});
subLocationSchema.plugin(timestamps);
const SubLocationModel = mongoose.model('subLocation', subLocationSchema);
module.exports = SubLocationModel;
