const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs")

const User = require("../models/user")

const localOptions = {
  usernameField: "username"
};
passport.use(
  new LocalStrategy(localOptions, async (username, password, done) => {
    // Match user
    try {
      const user = await User.findOne({ username })
      if (!user) return done(null, false, { message: "Invalid username or password" })
      // Match password
      bcrypt.compare(password, user.password, (err,isMatch) => {
        
        if(err) return done(null, false, { message: "Something went wrong, please try again" })
        if (isMatch)return done(null, user);
        return done(null, false, { message: 'Invalid username or password' });
      });
    } catch (err) {
      return done(null, false, { message: "Something went wrong, please try again" })
    }
  })
);

// Create JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload._id);
      if (!user) return done(null, false, { message: "Invalid username or password" })
      console.log(payload.exp < Date.now())
      if (payload.exp > Date.now()) return done(null, false, { message: "Your session has expired!" });
      return done("login success", user);
    } catch (error) {
      console.log({ error });
      done(null, false, { message: "Something went wrong, please try again" });
    }
  }));