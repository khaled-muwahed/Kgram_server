const express = require('express');
const app = express();
// import routes
const authRoute = require('./routes/auth');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const errorHandler = require('./errorHandling/server_error_handler');

const postRoute = require('./routes/posts');
//const router = require('./routes/auth');
dotenv.config();
//connect to db
 mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('db connected !!!!!!!!!!!!!!!!!!!!')
);
//Middleware
app.use(express.json());
//app.use(errorHandler);
//Route Middleware
app.use('/api/user', authRoute);

//check user auth
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('server up and running'))