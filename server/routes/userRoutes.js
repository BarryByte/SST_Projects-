const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
// we cann't take risk to save password in plan text

const router = express.Router();

// router.post("/register", async (req, res) => {
//     try{
//         //check for duplication
//         const userExists = await User.findOne({email : req.body.email})
//         if(userExists){
//             // res.status(400).json('User already exists')
//              res.send({
//                 success : false,
//                 message : "User already exists"
//             })
//         }

//         // namak swaad anusar
//         const salt = await bcrpyt.genSalt(10)
//         const hashPassword = await bcrpyt.hash(req.body.password, salt)
//         req.body.password = hashPassword;

//         // get the data from the body and save it.
//         const newUser = new User(req.body);
//     await newUser.save();

//     res.send({
//       success: true,
//       message: "You've successfully signed up, please login now!",
//     });
//   } catch (error) {
//     res.status(500).send(error)
// });

router.post("/register", async (req, res) => {
	try {
		// Check for duplication
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists) {
			return res.send({
				success: false,
				message: "User already exists"
			});
		}

		// Salt and hash password
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		req.body.password = hashPassword;

		// Get the data from the body and save it
		const newUser = new User(req.body);
		await newUser.save();

		res.send({
			success: true,
			message: "You've successfully signed up, please login now!"
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			res.send({
				success: false,
				message: "User Does not exist , please register"
			});
		}

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!validPassword) {
			return res.send({
				success: false,
				message: "Invalid Password"
			});
		}

		// const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
		//   expiresIn: "1d",
		// });

		res.send({
			success: true,
			message: "You've successfully logged in!"
			// token: token,
		});
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
