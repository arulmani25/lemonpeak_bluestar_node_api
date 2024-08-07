const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const newequipmentSchema = new mongoose.Schema({
    equipment_tag: { type: String },
    type: { type: String },
    location: { type: String },
    sub_location: { type: String },
    cobie_tag: { type: String },
    is_active: { type: Boolean, default: true },
    qrcode: { type: String }
});
newequipmentSchema.plugin(timestamps);
const NewequipmentModel = mongoose.model('new_equipments', newequipmentSchema);
module.exports = NewequipmentModel;
