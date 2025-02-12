const { string } = require('joi');
var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    caption: {
        type: String,

    },
    path: {
        type: String,
    },
});
module.exports = new mongoose.model('Image', imageSchema);