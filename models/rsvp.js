const mongoose = require('mongoose');


const RSVPSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        default: mongoose.ObjectId
    },
    rsvpName: {
        type: String,
        required: true,
        default: "Registration"
    },
    rsvpDetail: {
        type: String,
        default: ""
    },
    seatCount: {
        type: Number,
        default: 0
    },
    forStudent: {
        type: Boolean,
        default: true
    },
    rsvpField: [{
        inputType: {
            type: String,
            enum: ['number', 'email', 'text']
        },
        label: String,
        canRemove:{
            type:Boolean,
            default:true
        }
    }]
})

module.exports = mongoose.model('RSVP', RSVPSchema);