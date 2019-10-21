const Event = require('../models/event')


/**
 * @router GET api/event/{userID | EventID}
 * @desc get Event details using userID or eventID
 * @access for all user
 * @return event details 
 */
exports.eventDetails = async (req, res) => {
  try {
    let event = await Event.findOne({ $or: [{ _id: req.params.eventID }, { createdBy: req.params.eventID }] }); //find event using user id
    // let event = await Event.findOne({ createdBy: req.params.eventID }); //find event using user id
    // console.log(event)
    // if (!event) event = await Event.findById(req.params.eventID)
    // console.log(event)
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ details: event });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong try again" });
  }
}

/**
 * @router PUT api/event/{eventID}
 * @desc edit event details
 * @access for admin only
 * @return update event details in database
 */
exports.eventEdit = async (req, res) => {
  try {
    let event = await Event.findById(req.params.eventID);
    if (!event) return res.status(404).json({ message: "Event not found" });
    const field = req.body;
    for (let [key, value] of Object.entries(field)) {
      event[key] = value
    }
    const updateEvent = await event.save()
    res.json({ details: event })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
}

