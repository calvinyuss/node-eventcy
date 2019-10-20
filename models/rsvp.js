const mongoose = require('mongoose');


const RSVPSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event"
    },
    RSVPName: {
        type: String,
        required: true,
        default: "Registration"
    },
    RSVPDetail: {
        type: String,
        default: ""
    },
    seatCount: Number,
    forStudent: {
        type: Boolean,
        default: false
    },
    RSVPFixedField: [{
        inputType: {
            type: String,
            enum: ['number', 'email', 'text']
        },
        label: String
    }],
    RSVPField: [{
        inputType: {
            type: String,
            enum: ['number', 'email', 'text']
        },
        label: String
    }]
})

module.exports = mongoose.model('RSVP', RSVPSchema);