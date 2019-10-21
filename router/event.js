const router = require("express").Router();
const Event = require("../models/event");
const event = require("../controller/event");
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

//go to rsvp api
router.use("/:eventID/rsvp", async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.eventID);
        if (!event) return res.status(404).json({ message: "Event id not found" });
        next()
    } catch (err) {
        console.log(err);
        res.status(500).json("Something went wrong, please try again");
    }
}, require("./rsvp"))

module.exports = router;