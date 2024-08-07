const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const objectId = mongoose.Schema.ObjectId;
const subActivitySchema = new mongoose.Schema({
    index: { type: Number },
    location: { type: String },
    sub_activity_code: { type: String },
    main_activity: { type: objectId },
    equiptag: { type: String },
    activity_type: { type: objectId },
    description: { type: String },
    delete_status: { type: Boolean, default: false },
    created_by: { type: objectId }
});
subActivitySchema.plugin(timestamps);
const SubActivityModel = mongoose.model('subactivity', subActivitySchema);

module.exports = SubActivityModel;
