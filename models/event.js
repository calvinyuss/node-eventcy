const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name : {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    price : {
        type: Number,
        default: ""
    },
    seat: {
        type: String,
        default: ""
    },
    openRegis: {
        type: Date,
        default: Date.now()
    },
    closeRegis: {
        type: Date,
        default: Date.now() + 3600
    },
    RSVPID: {
        type: Array,
        ref:"RSVP"
    }
})

module.exports = mongoose.model('Event',EventSchema);