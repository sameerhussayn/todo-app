import mongoose from "mongoose";


const taskSchema = {
    taskName : {
        type: String, 
        required: true
    },
    taskDescription: {
        type: String,
        default: ''
    },
    isCompleted : {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date
    }
}
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        maxlength: 15
    },
    lastName : {
        type: String,
        required: true,
        maxlength: 15
    },
    email : {
        type: String,
        required: true,
        maxlength: 40,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    phone: {
        type: String, 
        required : true
    },
    otpData: {
        type:{
            otp: { type: Number, default: null },
            expireAt: {type:Date },
        }
    }, 
    isMailVerified: {
        type: Boolean,
        default: false
    },
    tasks: [taskSchema]
})


const User = new mongoose.model('User', userSchema)

export default User;