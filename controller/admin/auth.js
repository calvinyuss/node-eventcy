const jwt = require("jsonwebtoken");
const passport = require('passport');

/**
 * @router api/auth/login
 * @desc admin login page
 * @ascces for admin only
 */
exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) return res.status(400).json({ message: info ? info.message : 'Something went wrong, please try again' });
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: 60 * 60 });
    return res.json({ user, token });
  })(req, res, next);
}