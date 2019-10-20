const express = require('express');
const router = express.Router();
const { eventDetails } = require("../controller/event")
const { requireAuth } = require("../middleware/auth");

/**
 * @router api/{userID | EventID}
 * @desc get Event details using userID or eventID
 * @access for all user
 */
router.get('/:eventID', requireAuth, eventDetails)

router.post('/:eventID/edit')



module.exports = router;