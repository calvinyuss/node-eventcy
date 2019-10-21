const express = require('express');
const router = express.Router();
const event = require("../controller/event")
const { requireAuth } = require("../middleware/auth");

/**
 * @router GET api/{userID | EventID}
 * @desc get Event details using userID or eventID
 * @access for all user
 */
router.get('/:eventID', requireAuth, event.eventDetails)

/**
 * @router PUT api/{eventID}
 * @desc edit event details
 * @access for admin only
 * @return update event details in database
 */
router.put('/:eventID', requireAuth, event.eventEdit)




module.exports = router;