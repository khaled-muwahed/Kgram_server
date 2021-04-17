const router = require('express').Router();
const User = require('../model/User');
const mainS = require('../index');
// import validate 
const validateDto = require('../middleware/validate_dto');
const {userValidation, loginValidation} = require('../validation');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//validation

router.post('/new', async (req, res) => {
    ////const validatedBody = await (req.body.email);

    //replacing the request body with the validated body
   
    const {error} =  userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking the data base to see if email already exists
    const emailTaken = await User.findOne({email: req.body.email});
    if(emailTaken) return res.status(400).send('the email used by another member');


    //password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password ,salt);

    // creating a new user
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
    });
    try {
        
        const savedUser = await user.save();
        res.send({user: user._id});
       
    }
    catch (err) {
        res.status(400).send(err);
    }

});

router.post('/login' , async (req , res) => {
    const {error} = loginValidation(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

        //checking the data base to see if email already exists
        
        const user = await User.findOne({email: req.body.email.toLowerCase()});
        if(!user) return res.status(400).send('email not found');
        // check password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('invalid pasword');

        // create token and assign it to user
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.status(200);
        res.header('auth_token', token).send({token});
      

});

module.exports = router;