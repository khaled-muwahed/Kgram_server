const router = require('express').Router();
const User = require('../model/User')
const mainS = require('../index')


// import validate 
const validateDto = require('../middleware/validate_dto');

const validateDate = require('../validation');

//validation
router.post('/new', validateDto(validateDate), async (req, res) => {
    // const { error} = validateDate(req.body);


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch (err) {
        res.status(400).send(err);

    }

});

/*
router.post('/new', async (req, res) => {
    const { error} = validateDate(req.body);
 

    const user = new User ({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err);
        
    }
    
});*/
//router.post('/login')
module.exports = router;