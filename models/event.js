const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    createBy: {
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
    openRegis: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: ""
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
    RSVPID: [{
        _id: mongoose.Schema.Types.ObjectId,
        label: String
    }]
})

module.exports = mongoose.model('Event', EventSchema);