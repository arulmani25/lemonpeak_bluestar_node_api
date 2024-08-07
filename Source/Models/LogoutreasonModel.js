const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const logoutReasonListSchema = new mongoose.Schema({
    logout_reason: { type: String }
});
logoutReasonListSchema.plugin(timestamps);

const LogoutReasonModel = mongoose.model('logoutreason', logoutReasonListSchema);

module.exports = LogoutReasonModel;
