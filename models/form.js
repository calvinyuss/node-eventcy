const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event"
    },
    status:{
        type:String,
        default :'Accepted',
        enum : ['Pending','Waiting','Accepted','Rejected'] 
    },
    participantData: mongoose.Schema.Types.Mixed,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Form",formSchema)