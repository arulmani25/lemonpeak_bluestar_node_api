const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const locationSchema = new mongoose.Schema({
    main_location: { type: String },
    is_active: { type: Boolean, default: true }
});
locationSchema.plugin(timestamps);
const MainlocationModel = mongoose.model('mainlocation', locationSchema);
module.exports = MainlocationModel;
