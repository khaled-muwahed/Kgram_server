const { Router } = require('express');
const User = require('../model/User');

const multer = require('multer');

const storage = multer.diskStorage({
destination: function(req , file , cb) {
    cb(null,'./uploads/')
},
filename: function  (req , file, cb) {
    cb (null, +'-' + Date.now()+ file.originalname );  
}
});

//const upload = multer({dest : 'uploads/'})



const upload = multer({storage : storage})

const router = require ('express').Router();
const authotise = require('./verifyAuth');
const imgModel = require('../model/postModel'); 
const { Mongoose } = require('mongoose');

var path = require('path');
var fs = require('fs');


router.post('/', upload.single('image'),authotise, (req, res , next) => {
    console.log(req.file)
    const Img = new imgModel ({
       
        caption: req.body.caption,
        img: {
            
            data: fs.readFileSync(path.join( 'uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
        
    });
  
    Img.save()
    .then(result => {
       // console.log(result);
        res.status(201).json({
            message: "succsess",
            caption: result.caption,
          //  path: result.path

        })
    })

    
    .catch((err) => {
        console.log(err , "eroororoorroor")
    });

//const find = User.findOne({_id: req.user});
//res.status().send(body)
}

);


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