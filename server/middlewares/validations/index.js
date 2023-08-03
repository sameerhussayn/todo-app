import { body,param,  validationResult } from "express-validator";

function regValidations (){
   return [
    body('firstName', 'Firstname is required').notEmpty().isLength({min: 3, max: 15}),
    body('lastName', 'lastname is required').notEmpty().isLength({min: 3, max: 15}),
    body('email', 'Email must be valid').isEmail(),
    body('password', 'password must contain min 8 characters.').notEmpty().isLength({min:8}),
    body('password2').custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error("passwords does not match")
        }
        return true;
    }),
    body('phone', 'Enter a valid phone Number.').isMobilePhone('en-IN')
    ]
}

function otpValidations (){
  return  [
    param('id', 'Unauthorized access Id').notEmpty().isLength({min:24}),
    body('otp','Invalid OTP').notEmpty().isNumeric().isLength({min:6})]
}

function addTaskValidations(){
    return[
        body('taskName', 'Task name is required').notEmpty(),
        // body('deadline', 'Deadline is required').isDate(),
    ]
}

function editTaskValidations(){
  return[
      body('taskName', 'Task name is required').notEmpty(),
      param('id', 'Id of task to remove cannot be empty or null.').notEmpty()
  ]
}
function deleteTaskValidations(){
  return [
    param('id', 'Unauthorized access Id').notEmpty().isLength({min:24})
  ]
}

function errorMiddleware(req, res, next){
    const err = validationResult(req)
    if (!err.isEmpty()){
      console.log(err)
      return res
      .status(400)
      .json({
        success: false,
        msg: "invalid credentials",
        error : err.array(),
      });
    }
    
    return next();
}

export {regValidations, otpValidations,errorMiddleware, addTaskValidations, editTaskValidations,deleteTaskValidations}