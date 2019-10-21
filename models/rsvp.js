const mongoose = require('mongoose');


const RSVPSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event"
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
    seatCount: Number,
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