class ApiError{
    constructor (code, message)
    {
        this.message = message;
        this.code = code;
    }
    static badReq(msg){
        return new ApiError(400, msg);
    }
     
}

module.exports = ApiError;
