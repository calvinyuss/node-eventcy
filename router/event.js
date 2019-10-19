const express = require('express');
const router = express.Router();
const { userRegister } = require("../controller/event")

/**
 * @router api/eventID/register
 * @desc allow user to register event
 * @access for student or public 
 */
router.post('/:eventID/register', userRegister)




module.exports = router;