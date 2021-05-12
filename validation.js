const Joi = require('joi');
//new user schema
const userValidation = data => {
  const schema = Joi.object( {
    first_name : Joi.string().min(2).required(),
    last_name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email().lowercase(),
    password: Joi.string().min(6).required()
  })

  return  schema.validate(data);
};
// login schema
const loginValidation = data => {
  const schema = Joi.object( {
    email: Joi.string().lowercase().min(6).required().email(),
    password: Joi.string().min(6).required()
  })
  return  schema.validate(data);
};

module.exports.userValidation = userValidation;
module.exports.loginValidation = loginValidation;

