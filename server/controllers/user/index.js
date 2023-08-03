import express from 'express'
import bcrypt, { compareSync } from 'bcrypt'
// import randomString from '../../utils/randomString.js'
import sendMail from '../../utils/sendMail.js'
import otpGen from '../../utils/otpGen.js'
import userModel from '../../model/users/index.js'
import { regValidations, otpValidations, errorMiddleware } from '../../middlewares/validations/index.js'
import 'dotenv/config.js'
import tokenGen from '../../utils/tokenGen.js'


const router = express.Router()

router.post('/register',regValidations(), errorMiddleware,  async(req, res, next)=>{
    try {
        const userFound = await userModel.findOne({email:req.body.email})
        if(userFound){
            return res.status(409).json({msg: 'User already exists.', success: false})
        }
        req.body.password = await bcrypt.hash(req.body.password, 12)
        
        const otpData= otpGen(6, 5)
        req.body.otpData = otpData
      
        const user = new userModel(req.body)
        await user.save()
        res.status(200).json({msg: 'Registered successfully.', _id: user._id, success: true})
        next()
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error.', success: false })
    }
},sendMail)

router.post('/verifyotp/:id',otpValidations(), errorMiddleware, async(req, res)=>{
    try {
        // console.log(req.params.id)
        let userFound = await userModel.findOne({_id: req.params.id})
        
        if(!userFound){
            return res.status(401).json({msg: 'Unauthorized access.',success: false})
        }
        if(!userFound.otpData){
            return res.status(403).json({msg:'Account already verified', success: true})
        }
        const {otpData: {otp, expireAt}} = userFound
        
        const curTime = new Date().getTime()
        const diff = expireAt - curTime
        if(diff < 0 ){
            return res.status(401).json({msg: 'OTP expired.', success: false})
        }

        if(req.body.otp !== otp){
            return res.status(401).json({msg: 'Wrong OTP', success: false})
        }

        const updated = await userModel.updateOne(
            {_id: req.params.id},
            {
                $set: {isMailVerified: true},
                $unset: {otpData: 1}
            }
        )
         const { modifiedCount, acknowledged} = updated
        console.log( modifiedCount, acknowledged)
        return res.status(200).json({ msg: 'OTP verified. Mail is now verified.', success: true });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error.', success: false })
    }
})


router.get('/resendotp/:email', async(req, res, next)=>{
    try {
        let userFound = await userModel.findOne({email: req.params.email})
       
        if(!userFound){
            return res.status(409).json({error: 'Unauthorized access', success: false})
        }
       
        if(userFound.isMailVerified){
            return res.status(304).json({error:'Email already Verified', success: false})
        }
        
        const newOtp= otpGen(6, 1)
        req.body.otpData = newOtp
        
        const { modifiedCount, acknowledged} =await userModel.updateOne(
            {email: req.params.email},
            {
                $set:{otpData: newOtp }
            }
        )

         
        if(!modifiedCount || !acknowledged ){
            res.status(500).json({ msg: 'Internal server error.', success: false })
        }
        const id = userFound._id
        res.status(200).json({msg: 'Otp has been send successfully.', success: true, id})
        req.body.email = req.params.email
        next()
       
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error.', success: false })
    }
}, sendMail)

router.post('/login', async(req, res)=>{
    try {
        const {email, password} = req.body
        const userFound = await userModel.findOne({email})

        if(!userFound){
            return res.status(409).json({msg: 'Account does not exist.', success: false})
        }
        // check password
        const matchPassword = await bcrypt.compare(password, userFound.password)
        if(!matchPassword){
            return   res.status(409).json({msg:'Invalid Password', success: false});
        }
        // check account verified
        if(!userFound.isMailVerified){
            return res.status(409).json({success: false, msg: "Account not verified."})
        }
        // console.log(userFound)
        const token = tokenGen({id: userFound._id}, '1h')
        const name = userFound.firstName
        res.status(200).json({success:true, msg: 'Login successfully', token, name})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error', success: false });
    }
})
export default router;