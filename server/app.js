import 'dotenv/config'
import express from 'express'
import './dbConnect.js'
import cors from 'cors'
import userRouter from './controllers/user/index.js'
import taskRouter from './controllers/task/index.js'
const port = process.env.PORT || 4000

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'https://todo-management-app-v1.netlify.app',

  }));

app.use('/api/user', userRouter)
app.use('/api/task', taskRouter)
app.get('/', (req, res)=>{
    res.send('Home page')
})

app.listen(port, ()=>{
    console.log('Server has started at port: '+ port)
})