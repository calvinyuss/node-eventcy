const Event = require('../models/event')


/**
 * @router api/{userID | EventID}
 * @desc get Event details using userID or eventID
 * @access for all user
 */
exports.eventDetails = async (req, res) => {
  try {
    const event = await Event.findOne({createBy:req.param.eventID});
    if (!event) event = await Event.findById(req.param.eventID)
    res.status(200).json(event)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errorMessage: "Something went wrong try again" })
  }
}

