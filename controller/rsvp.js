const Event = require('../models/event')
const RSVP = require('../models/rsvp')
const Form = require('../models/form')

/**
 * @router POST api/event/{eventID}/rsvp
 * @desc add new rsvp
 * @access admin only
 * @returns rsvp details
 */
exports.addRsvp = async (req, res) => {
  try {
    let event = await Event.findById(req.params.eventID);
    if (!event) return res.status(404).json({ message: "Event id not found" })
    const field = [
      {
        inputType: "text",
        label: "Name",
        canRemove: false
      },
      {
        inputType: "text",
        label: "NIM",
        canRemove: false
      },
      {
        inputType: "email",
        label: "Email",
        canRemove: false
      },
      {
        inputType: "text",
        label: "Class",
        canRemove: false
      },
      {
        inputType: "text",
        label: "Line ID",
        canRemove: false
      },
      {
        inputType: "number",
        label: "Phone number",
        canRemove: false
      },
    ]
    const rsvp = new RSVP({
      createdBy: event._id,
      rsvpField: field
    })
    const newRsvp = await rsvp.save()
    event.rsvpID.push(newRsvp._id);
    const updateEvent = await event.save()
    res.json({ details: newRsvp })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
}

/**
 * @router GET api/rsvp/{rsvpID}
 * @desc edit rsvp details
 * @access admin and user 
 * @return details = event Details
 */
exports.getDetails = async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.rsvpID);
    if (!rsvp) return res.status(404).json({ message: "RSVP id not found" })
    res.json({ details: rsvp })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
}

/**
 * @router PUT api/rsvp/{rsvpID}
 * @desc edit rsvp details
 * @access admin only
 */
exports.editRsvp = async (req, res) => {
  try {
    let rsvp = await RSVP.findById(req.params.rsvpID)
    if (!rsvp) return res.status(404).json({ message: "RSVP id not found" })
    const field = req.body
    console.log(rsvp)
    for (let [key, value] of Object.entries(field)) {
      if (key === "rsvpField") continue
      rsvp[key] = value
    }
    const newRsvp = await rsvp.save();
    res.json({ details: newRsvp })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
}

/**
 * @router DELETE api/rsvp/{rsvpID}
 * @desc delete rsvp
 * @access admin only
 * @returns event details
 */
exports.deleteRsvp = async (req, res) => {
  try {
    let rsvp = await RSVP.findById(req.params.rsvpID)
    if (!rsvp) return res.status(404).json({ message: "RSVP id not found" })
    let event = await Event.findOne(rsvp.ownedBy)
    console.log(event.rsvpID)
    let index = event.rsvpID.indexOf(rsvp._id);
    if (index > -1) event.rsvpID.splice(index, 1);
    console.log(event.rsvpID)
    await rsvp.remove()
    const updateEvent = await event.save()
    res.json({ details: updateEvent })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
}

/**
 * @router put api/rsvp/{rsvpID}
 * @desc edit rsvp details
 * @access admin only
 */
// exports.editRsvpField = async (req, res) => {
//   let rsvp = await RSVP.findById(req.params.rsvpID)
//   const field = req.body
//   for(let [key,value] of Object.entries(field)){
//     rsvp[key] = value
//   } 
//   rsvp.rsvpField.forEach(element => {
//     console.log(element)
//   });
// }

/**
 * @router POST api/rsvp/{rsvpID}/form
 * @desc add participant
 * @access for user only
 * @returns form details
 */
exports.addParticipant = async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.rsvpID);
    if (!rsvp) return res.status(404).json({ message: "RSVP id not found" });

    const emailExsit = await Form.findOne({ createdBy: rsvp._id, "participantData.Email": req.body.Email });
    if (emailExsit) return res.json({ message: "Email already exsit" });
    const participant = await Form.find({ createdBy: rsvp._id, status: "Accepted" });
    let data = req.body
    for (let [key, value] in Object.entries(data)) {
      if (typeof (value) === "string") data[key] = value.toLowerCase()
    }
    let form
    if (rsvp.seatCount == participant.length) {
      form = new Form({
        createdBy: rsvp._id,
        participantData: req.body,
        status: "Waiting"
      })
    } else {
      form = new Form({
        createdBy: rsvp._id,
        participantData: req.body
      })
    }
    const newForm = await form.save();
    res.json({ details: newForm })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
}

/**
 * @router GET api/rsvp/{rsvpID}/form
 * @desc get all participant data using rsvp ID
 * @access for admin only
 * @returns get all particpant
 */
exports.getParticipant = async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.rsvpID);
    if (!rsvp) return res.status(404).json({ message: "RSVP id not found" });
    const allParticipant = await Form.find({ createdBy: rsvp._id });
    res.json({ participant: allParticipant })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
}

exports.editParticipant = async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.rsvpID);
    if (!rsvp) return res.status(404).json({ message: "RSVP id not found" });
    if (!req.query) return res.status(400).json({ message: "Participant not found" });
    let participant = await Form.findById(req.query.id);
    if (!participant) return res.status(400).json({ message: "Participant not found" });
    participant.participantData = req.body;
    const updateParticipant = await participant.save();
    console.log(updateParticipant)
    res.json({ details: updateParticipant })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
}

exports.deleteParticipant = async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.rsvpID);
    if (!rsvp) return res.status(404).json({ message: "RSVP id not found" }); 
    let participant = await Form.findById(req.params.formID);
    if (!participant) return res.status(400).json({ message: "Participant not found" });
    if (participant.createdBy.toString() !== rsvp._id.toString()) return res.status(401).json({message: "THIS IS NOT YOURS, ASSHOLE"})
    await participant.remove()
    res.status(204).send("Success")
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong, please try again" })
  }
}

