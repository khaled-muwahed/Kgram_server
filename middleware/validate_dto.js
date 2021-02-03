const ApiError = require("../errorHandling/errors_api");


function validateDto(schema) {
    return async (req, res, next) => {
        try {
            const validatedBody = await schema.validate(req.body);

            //replacing the request body with the validated body
            req.body = validatedBody;
            next();

        } catch (err) {
            next(ApiError.badReq(err));
            // res.status(400).json(err);
            //console.log('error detected' ,err);
        }
    };
}
module.exports = validateDto;