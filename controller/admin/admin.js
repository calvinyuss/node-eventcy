const User = require("../../models/user");
const Event = require("../../models/event");
const bcrypt = require("bcryptjs");
/**
 * @router api/admin/register
 * @desc register admin 
 * @access for private use only
 */
exports.adminRegister = async (req, res) => {
  const { username, email, password, password2 } = req.body;
  let errors = []
  if (!username || !email || !password || !password2) errors.push({ msg: 'Please enter all fields' });
  if (password != password2) errors.push({ msg: 'Passwords do not match' });
  if (password.length < 6) errors.push({ msg: 'Password must be at least 6 characters' });
  if (errors.length > 0) return res.status(400).json({ message: errors })
  else {
    const user = await User.findOne({$or:[{username},{email}]})
    if (user) {
      if (user.username == username) return res.status(409).json({ message: "Username already exist" })
      if (user.email == email) return res.status(409).json({ message: "Email alrady exist" })
    }
    const newUser = new User({
      username,
      email,
      password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(result => {
            const newEvent = new Event({
              createdBy: result._id
            })
            newEvent.save()
              .then(() => {
                return res.status(200).json({ message: "Register Success" })
              })
              .catch(err => { return res.status(500).json({ message: "something went wrong, please try again" }) })
          })
          .catch(err => { return res.status(500).json({ message: "something went wrong, please try again" }) })
      });
    });
  }
}