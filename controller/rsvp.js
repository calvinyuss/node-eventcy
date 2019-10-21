const Event = require('../models/event')
const RSVP = require('../models/rsvp')
/**
 * @router POST api/event/{eventID}/rsvp
 * @desc add new rsvp
 * @access admin only
 */
exports.addRsvp = async (req, res) => {
  try{
    let event = await Event.findById(req.params.eventID);
    if(!event) return res.status(400).json({message:"Event id not found"})
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
      createdby:event._id,
      rsvpField: field
    })
    const newRsvp = await rsvp.save()
    event.rsvpID.push(newRsvp._id);
    const updateEvent = await event.save()
    res.json({eventDetail:updateEvent, rsvp: newRsvp})
  }catch(err){
    console.log(err);
    res.status(500).json({message:"Something went wrong, please try again"})
  }
}