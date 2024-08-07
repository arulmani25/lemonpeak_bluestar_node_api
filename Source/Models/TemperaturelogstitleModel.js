const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const temperatureLogsTitleSchema = new mongoose.Schema({
    title: { type: String },
    isActive: { type: Boolean, default: true }
});
temperatureLogsTitleSchema.plugin(timestamps);
const TemperatureLogsTitleModel = mongoose.model('temperature_logs_title', temperatureLogsTitleSchema);

module.exports = TemperatureLogsTitleModel;
