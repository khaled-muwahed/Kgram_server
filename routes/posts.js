const { Router } = require('express');
const User = require('../model/User');

const multer = require('multer');

const storage = multer.diskStorage({
destination: function(req , file , cb) {
    cb(null,'./uploads/')
},
filename: function  (req , file, cb) {
    cb (null, + Date.now()+ file.originalname.replace(" " , "-") );  
}
});

const fileFilter = (req, file, cb ) => {
    // rejecting a file
    if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png'  ){
    // accepting a file
    cb(null, true)
    }
    else{
    cb(new Error ('you can upload png or jpeg only') , false);
    }
}

//const upload = multer({dest : 'uploads/'})

const upload = multer({storage : storage
, fileFilter: fileFilter,

})

const router = require ('express').Router();
const authotise = require('./verifyAuth');
const imgModel = require('../model/postModel'); 
const { Mongoose } = require('mongoose');

var path = require('path');
var fs = require('fs');
const { request } = require('http');


router.post('/', upload.single('image'),authotise, (req, res , next) => {
    console.log(req.file)
    console.log("REQ recieved")
    const Img = new imgModel ({
        
        path :req.file.path,
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
           // path: req.file.path
          //  path: result.path

        })
    })

    
    .catch((err) => {
        console.log(err , "eroororoorroor")
    });

}

);

router.get("/feed",(req , res, next) =>{
    imgModel.find()
    .select("caption path")
    .exec()
    .then( 
        result => {
        const response = {
            count: result.length,
          
            images: result.map(r => {
                return {
                    
                    id: r._id,
                    path: r.path,
                    caption: r.caption,
                    url: "http://localhost:3333/" + r.path
                }
            })
           
        }
         console.log(result)
        res.status(200).json(response);
    })
    
      .catch((err) => {
        console.log(err , "eroororoorroor")
        res.status(500).json({
            error: err
        })
    });
})

module.exports = router;