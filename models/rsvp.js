const mongoose = require('mongoose');

const RSVPSchema = mongoose.Schema({
    ownedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event"
    },
    
})

module.exports = mongoose.model('RSVP',RSVPSchema);