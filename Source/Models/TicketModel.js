const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const objectId = mongoose.Types.ObjectId;
const { jobStatus, priority } = require('../Utils/enum');

const ticketSchema = new mongoose.Schema({
    equipment: { type: String },
    equipment_no: { type: String },
    ticket_no: { type: String },
    location: { type: String },
    sub_location: { type: String },
    ticket_heading: { type: String },
    ticket_description: { type: String },
    phase: { type: String },
    type: { type: String },
    fault_description: { type: String },
    image: { type: Array },
    status: {
        type: String,
        enum: [jobStatus.Open, jobStatus.closed, jobStatus.completed, jobStatus.inProgress, jobStatus.pending]
    },
    priority: {
        type: String,
        enum: [priority.critical, priority.high, priority.low, priority.medium]
    },
    spare: { type: Array },
    raised_by: { type: objectId, ref: 'users' },
    updated_by: { type: objectId, ref: 'users' },
    assigned_to: { type: objectId, ref: 'users' },
    raised_by_name: { type: String },
    updated_by_name: { type: String }
});
ticketSchema.plugin(timestamps);
const TicketModel = mongoose.model('tickets', ticketSchema);

module.exports = TicketModel;
