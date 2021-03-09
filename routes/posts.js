const { Router } = require('express');
const User = require('../model/User');

const multer = require('multer');

const storage = multer.diskStorage({
destination: function(req , file , cb) {
    cb(null,'./storage/')
},
filename: function  (req , file, cb) {
    cb (null, new Date().toISOString() + file.originalname);
    
}
});





const upload = multer({storage : storage})

const router = require ('express').Router();
const authotise = require('./verifyAuth');
const imgModel = require('../model/postModel'); 
const { Mongoose } = require('mongoose');

var path = require('path');



router.post('/', upload.single('image'),authotise, (req, res , next) => {
    const Img = new imgModel ({
       
        caption: req.body.caption,
        img: {
            
            data: fs.readFileSync(path.join(__dirname + '/storage/' + req.file.filename)),
            contentType: 'image/png'
        }
        
    });
    console.log(req.file)
    

    Img.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "succsess"
        })
    })

    
    .catch((err) => {
        console.log(err , "eroororoorroor")
    });

//const find = User.findOne({_id: req.user});
    res.send(Img);
}

);

var fs = require('fs');
//var path = require('path');
/*

router.post('/', upload.single('image'), (req, res, next) => {
 
    var obj = {
        caption: req.body.caption,
        img: {
            
            data: fs.readFileSync(path.join(__dirname + '/storage/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
             item.save();
            res.redirect('/');
        }
    });
});*/

module.exports = router;