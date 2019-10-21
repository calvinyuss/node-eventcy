const router = require("express").Router({mergeParams: true});
const rsvp = require("../controller/rsvp")
const { requireAuth } = require("../middleware/auth");
/**
 * @router POST api/event/{eventID}/rsvp
 * @desc add new rsvp
 * @access admin only
 */
router.post("/", requireAuth, rsvp.addRsvp)

module.exports = router;