const { Router } = require('express');
const User = require('../model/User');

const router = require ('express').Router();
const authotise = require('./verifyAuth');
router.get('/',authotise, (req, res) => {
res.json({posts:
     {title: 'my first post',
     des: 'random data'}
    });

//const find = User.findOne({_id: req.user});
res.send(req.user);

}

);

module.exports = router;