const mongoose = require('mongoose');


const RSVPSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        default: mongoose.ObjectId
    },
    name: {
        type: String,
        required: true,
        default: "Registration"
    },
    description: {
        type: String,
        default: ""
    },
    seatCount: {
        type: Number,
        default: 0
    },
    public: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
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