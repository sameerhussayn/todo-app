import nodemailer from 'nodemailer'
import 'dotenv/config'


let { EMAIL_HOST:HOST,EMAIL_PORT: PORT, EMAIL_AUTH_USER, EMAIL_AUTH_PASSWORD } = process.env

async function sendRegMail(req) {
    try {
        // console.log(req.body)
        // await nodemailer.createTestAccount();
        // console.log(HOST, PORT,EMAIL_AUTH_USER , EMAIL_AUTH_PASSWORD)
        //connect with smt server
        let transporter = nodemailer.createTransport({
            host: HOST,
            port: PORT,
            secure: true,
            auth: {
                user: EMAIL_AUTH_USER,
                pass: EMAIL_AUTH_PASSWORD,
            }
        });
        
        console.log(req.body.email)
        let info = await transporter.sendMail({
            from: `"Task-manager 👻"${EMAIL_AUTH_USER}`, // sender address
            to: req.body.email, // list of receivers
            subject: "Account Verification", // Subject line
            // text: req.text, // plain text body
            html: `<h3>Verify your account by entering the below OTP.<p>Your otp is : ${req.body.otpData.otp}</p>`
            // </h3><a href = '${req.url}/api/user/verifymail/${req.mailToken}' >Verify your account.</a>` 
        })

        console.log('message sent: %s', info.messageId);
    } catch (error) {
        console.log(error)
    }
}


export default sendRegMail;
