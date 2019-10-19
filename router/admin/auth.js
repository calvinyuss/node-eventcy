const router = require("express").Router();

const controllers = require("../../controller/admin/auth");
const { requireAuth } = require("../../middleware/auth");

/**
 * @router api/auth/login
 * @desc admin login page
 * @ascces for admin only
 */
router.post("/login", controllers.login);


module.exports = router;