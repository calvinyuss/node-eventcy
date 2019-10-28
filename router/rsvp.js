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

/**
 * @router POST api/rsvp/{rsvpID}/form
 * @desc add participant
 * @access for user only
 * @returns form details
 */
router.post("/:rsvpID/form",rsvp.addParticipant)

/**
 * @router GET api/rsvp/{rsvpID}/form
 * @desc get all participant data using rsvp ID
 * @access for admin only
 * @returns get all particpant
 */
router.get("/:rsvpID/form",rsvp.getParticipant)

/**
 * @router PUT api/rsvp/{rsvpID}/form?id=
 * @desc update participant search using query id
 * @access for admin only
 * @returns get all particpant
 */
router.put("/:rsvpID/form",rsvp.editParticipant)

/**
 * @router DELETE api/rsvp/{rsvpID}/form/{formID}
 * @desc delete participant
 * @access for admin only
 */
router.delete("/:rsvpID/form/:formID",rsvp.deleteParticipant)

module.exports = router;