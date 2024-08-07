const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const objectId = mongoose.Types.ObjectId;
const userTypeSchema = new mongoose.Schema({
    user_type: { type: String },
    created_by: { type: objectId },
    updated_by: { type: objectId },
    is_active: { type: Boolean, default: true }
});
userTypeSchema.plugin(timestamps);
const UserTypeModel = mongoose.model('usertype', userTypeSchema);

module.exports = UserTypeModel;
