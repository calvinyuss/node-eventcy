require("./passport");
const passport = require("passport");

exports.requireAuth = passport.authenticate("jwt", { session: false });
exports.requireSignin = passport.authenticate("local", { session: false });
