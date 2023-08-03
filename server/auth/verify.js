import jwt from 'jsonwebtoken'
import 'dotenv/config'


const key = process.env.KEY 

 async function auth(req, res, next){
    try {
    
    const token = req.headers.token;

    if(!token){
       return res.status(409).json({success: false, msg: 'Unauthorized access'})
    }

    const payload = jwt.verify(token, key)
    
    req.payload = payload;
    return next();
    } catch (error) {
        console.log(error)
        if(error.name == 'JsonWebTokenError' || error.name == 'SyntaxError')
        return res.status(498).json({success : false, msg:'invalid token'})
       else if(error.name == 'TokenExpiredError')
           return res.status(401).json({success : false,msg : 'token expired'})
       else        
           return res.status(500).json({success : false,msg:'internal error'})
   }

}

export default auth;
