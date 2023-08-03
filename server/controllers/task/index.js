import express from 'express'
import auth from '../../auth/verify.js'
import userModel from '../../model/users/index.js'
import { addTaskValidations, errorMiddleware,editTaskValidations,deleteTaskValidations } from '../../middlewares/validations/index.js'
const router = express.Router()

router.post('/add',auth,addTaskValidations(), errorMiddleware,  async(req, res)=>{
    try {
        
        const {taskName, taskDescription, deadline } = req.body;
        
        const taskData = {taskName, taskDescription, deadline}
        
        const {modifiedCount, acknowledged} = await userModel.updateOne({_id: req.payload.id}, {$push:{'tasks': taskData}})

        if(!modifiedCount || !acknowledged ){
            res.status(500).json({ msg: 'Internal server error.', success: false })
        }
        return res.status(200).json({success: true, msg: 'Task added successfully'})

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})


router.put('/edit/:id', auth, editTaskValidations(), errorMiddleware, async(req,res)=>{
    try {
        let {taskName, taskDescription,deadline, isCompleted } = req.body;
        
        
        const taskData = {taskName, taskDescription, deadline,  isCompleted}
        const taskId = req.params.id
        const {modifiedCount, acknowledged} = await userModel.updateOne({"tasks._id": taskId}, {$set:{
            "tasks.$" : {...taskData}
        }})
        console.log(modifiedCount, acknowledged)
        if(!modifiedCount && !acknowledged){
          return  res.status(500).json({ msg: 'Internal server error.', success: false })
        }
        return res.status(200).json({success:true, msg: 'Task edited'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: 'Internal server error'})
    }
})

router.delete('/delete/:id',auth,deleteTaskValidations(), errorMiddleware, async(req, res)=>{
    try {
        
        let {modifiedCount, acknowledged} = await userModel.updateOne({_id: req.payload.id}, {
            $pull:  {tasks: {_id: req.params.id}}
        })
        if(!modifiedCount || !acknowledged){
            return  res.status(500).json({ msg: 'Internal server error.', success: false })
          }
        return res.status(200).json({success: true, msg: 'Task deleted.'})
    } catch (error) {
        console.log(error, 'from delte')
        res.status(500).json({success: false, msg: 'Internal server error'})
    }
})

router.get('/fetchall',auth, async(req, res)=>{
    try {
        const userFound = await userModel.findOne({_id: req.payload.id})
        if(!userFound){
            return res.status(409).json({error: 'Unauthorized access', success: false})
        }
        return res.status(200).json({success: true, tasks: userFound.tasks})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: 'Internal server error'})
    }
})

export default router;