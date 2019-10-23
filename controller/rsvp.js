const Event = require('../models/event')
const RSVP = require('../models/rsvp')

/**
 * @router POST api/event/{eventID}/rsvp
 * @desc add new rsvp
 * @access admin only
 */
exports.addRsvp = async (req, res) => {
  try {
    let event = await Event.findById(req.params.eventID);
    if (!event) return res.status(400).json({ message: "Event id not found" })
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
    res.json({ eventDetail: updateEvent, rsvp: newRsvp })
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
    if (!rsvp) return res.status(400).json({ message: "RSVP id not found" })
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
    if (!rsvp) return res.status(400).json({ message: "RSVP id not found" })
    const field = req.body
    console.log(rsvp)
    for (let [key, value] of Object.entries(field)) {
      if (key === "rsvpField") continue
      rsvp[key] = value
    }
    const newRsvp = await rsvp.save();
    res.json({ details: newRsvp })
  }catch(err){
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
    if (!rsvp) return res.status(400).json({ message: "RSVP id not found" })
    let event = await Event.findOne(rsvp.ownedBy)
    console.log(event.rsvpID)
    let index = event.rsvpID.indexOf(rsvp._id);
    if (index > -1) event.rsvpID.splice(index, 1);
    console.log(event.rsvpID)
    await rsvp.remove()
    const updateEvent = await event.save()
    res.json({ details: updateEvent })
  }catch(err){
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
