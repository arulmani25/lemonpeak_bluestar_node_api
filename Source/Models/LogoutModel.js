const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const objectId = mongoose.Types.ObjectId;
const logoutSchema = new mongoose.Schema({
    logout_reason: { type: String },
    logout_time: { type: Date, default: Date.now() },
    user_id: { type: objectId }
});
logoutSchema.plugin(timestamps);

const LogoutModel = mongoose.model('logout', logoutSchema);

module.exports = LogoutModel;
