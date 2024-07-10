const express = require("express");
const User = require("../models/userModel");
const bcrpyt = require("bcrypt")
// we cann't take risk to save password in plan text


const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        //check for duplication
        const userExists = await User.findOne({email : req.body.email})
        if(userExists){
            // return res.status(400).json('User already exists')
            return res.send({
                success : false,
                message : "User already exists"
            })
        }

        // namak swaad anusar
        const salt = await bcrpyt.genSalt(10)
        const hashPassword = await bcrpyt.hash(req.body.password, salt)
        req.body.password = hashPassword;

        // get the data from the body and save it.
        const newUser = new User(req.body);
        await newUser.save()
        // we need to send response also
        res.status(201).json('User created Succesfully');

    }
    catch(err){
        res.json(err)
    }

});

router.post("/login", async (req, res) => {
    const user = await User.findOne({email : req.body.email})
    if(!user){
        res.send({
        success : false,
        message : "User not found, Please Register"
        })
    }
    // password check
    const validPassword = await bcrpyt.compare(req.body.password, user.password)
    if(!validPassword){
        return  res.send({
            success : false,
            message : "Invalid Password"
        })
    }

    
    res.status(201).json('User logged in Succesfully');
    
});


module.exports = router;