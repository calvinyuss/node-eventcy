const router = require("express").Router();
const rsvp = require("../controller/rsvp")
const { requireAuth } = require("../middleware/auth");

/**
 * @router GET api/rsvp/{rsvpID}
 * @desc edit rsvp details
 * @access admin and user 
 * @return details = event Details
 */
router.get("/:rsvpID",rsvp.getDetails)

/**
 * @router PUT api/rsvp/{rsvpID}
 * @desc edit rsvp details
 * @access admin only
 */
router.put("/:rsvpID",requireAuth,rsvp.editRsvp)

/**
 * @router DELETE api/rsvp/{rsvpID}
 * @desc delete rsvp
 * @access admin only
 * @returns event details
 */
router.delete("/:rsvpID",rsvp.deleteRsvp)

/**
 * @router PUT api/rsvp/{rsvpID}/field
 * @desc edit rsvp field
 * @access admin only
 */
// router.put("/:rsvpID/field", requireAuth, rsvp.editRsvpField )

module.exports = router;