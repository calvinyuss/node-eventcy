const router = require("express").Router();
const Event = require("../models/event");
const event = require("../controller/event");
const rsvp = require("../controller/rsvp")
const { requireAuth } = require("../middleware/auth");

/**
 * @router GET api/event/{userID | EventID}
 * @desc get Event details using userID or eventID
 * @access for all user
 */
router.get("/:eventID", requireAuth, event.eventDetails)

/**
 * @router PUT api/event/{eventID}
 * @desc edit event details
 * @access for admin only
 * @return update event details in database
 */
router.put("/:eventID", requireAuth, event.eventEdit)

/**
 * @router POST api/event/{eventID}/rsvp
 * @desc add new rsvp
 * @access admin only
 * @returns rsvp details
 */
router.post("/:eventID/rsvp",requireAuth, rsvp.addRsvp)

module.exports = router;