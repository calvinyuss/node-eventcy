const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    venue:{
        type: String,
        default: ""
    },
    openRegis: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    payementTo: {
        type: String,
        default: ""
    },
    openRegisDate: {
        type: Date,
        default: Date.now()
    },
    closeRegisDate: {
        type: Date,
        default: Date.now() + 3600
    },
    rsvpID: Array
})

module.exports = mongoose.model('Event', EventSchema);