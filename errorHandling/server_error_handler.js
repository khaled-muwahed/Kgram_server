const ApiError = require('./errors_api');

function errorHandler(err, req, res, next) {

    console.error(err);
    if (err instanceof ApiError) {
        //return the error if known with the status code
        return res.status(err.code).json(err.message);
    
    }
    //returning generic 500 server error
    return res.status(500).json('there is an issue');
}
module.exports = errorHandler;