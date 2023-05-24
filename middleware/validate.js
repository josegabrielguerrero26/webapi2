const validator = require('../helper/validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    first_name: 'required|string',
    last_name: 'required|string',
    email: 'required|email',
    city: 'required|string',
    birthday: 'string'
  };


  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


const saveVeh = (req, res, next) => {
    const validationRule = {
        Veh_number: 'required|string',
        Year: 'required|string',
        Model: 'required|string',
        Vin: 'required|string',
        Purch_date: 'required|string',
        Curr_value: 'required|string',
        Curr_odom: 'required|string'  
    }; 
    
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
          res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
          });
        } else {
          next();
        }
      });
    };
    



module.exports = {
  saveContact,
  saveVeh
};