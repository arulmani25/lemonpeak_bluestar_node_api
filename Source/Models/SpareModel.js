const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const spareSchema = new mongoose.Schema({
    equipment: { type: mongoose.Types.ObjectId, ref: 'activities' },
    equipment_name: { type: String },
    spare_name: { type: String }
});
spareSchema.plugin(timestamps);
const SpareModel = mongoose.model('spare', spareSchema);

module.exports = SpareModel;
