import jwt from 'jsonwebtoken'
import 'dotenv/config.js'

const tokenKey = process.env.KEY;

export default function tokenGen(payload, expiry){
    // console.log(payload, expiry, tokenKey)
    const token = jwt.sign(payload, tokenKey, {expiresIn: expiry})
    return token
}