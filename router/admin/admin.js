const router = require("express").Router();
const { adminRegister } = require("../../controller/admin/admin")
/**
 * @router api/admin/register
 * @desc register admin 
 * @access for private use only
 */
router.post("/register", adminRegister)

module.exports = router;



