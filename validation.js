
const Yup = require('yup');


module.exports = Yup.object().shape({
   // const UserValidation = data => {
       // const schema = {
        name: Yup.string().required().min(4),
        email: Yup.string().email().min(6).required().lowercase(),
        password: Yup.string().required().min(6)
       // };
      //  return Yup.validate(data, schema);
        
    });
   // module.exports.UserValidation = UserValidation;
  
