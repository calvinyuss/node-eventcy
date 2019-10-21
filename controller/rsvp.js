
/**
 * @router api/RSVPID/register
 * @desc allow user to register event
 * @access for student or public 
 */
// exports.userRegister = async (req, res) => {
//     try {
//       const event = await Event.findById(req.params.eventID);
//       const field = req.body;
  
//       //check if already register
//       const email = await Form.find({ Email: req.body.email });
//       if (email.length > 0) return res.status(409).json({ errorMessage: "Email already Exist" });
  
//       //saving user field to json
//       let userForm = {};
//       for (let [key, value] of Object.entries(field)) {
//         if (!value) return res.status(400).json({ errorMessage: `${key}field is empty` });
//         userForm[key] = value;
//       }
//       userForm["Date"] = Date.now();
  
//       const newUserForm = Form({
//         ownedBy: event._id,
//         data: userForm
//       });
//       let saveNewFrom = await newUserForm.save();
//       res.status(201).json({ message: "Register success" })
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ errorMessage: "Something went wrong try again" })
//     }
//   }