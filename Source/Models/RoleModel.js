const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const objectId = mongoose.Types.ObjectId;
const roleSchema = new mongoose.Schema({
    role_type: { type: String },
    user_type: { type: objectId },
    is_active: { type: Boolean, default: true }
});
roleSchema.plugin(timestamps);
const RoleModel = mongoose.model('role', roleSchema);

module.exports = RoleModel;
