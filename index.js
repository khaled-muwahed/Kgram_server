const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');
const postRoute = require('./routes/posts');
dotenv.config();
//connect to db
 mongoose.connect(process.env.DB_CONNECT ,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    console.log('connected')
}
);
var cors = require('cors')
app.use(cors())
//Middleware
app.use(express.json());
//Route Middleware
app.use('/api/user', authRoute);
//making storage folder publicly accessible 
app.use('/uploads', express.static('uploads'))
//Route Middleware
app.use('/api/posts', postRoute);
// Set EJS as templating engine 
app.set("view engine", "ejs");
app.listen(3333, () => console.log('server up and running'))