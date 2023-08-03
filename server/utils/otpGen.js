export default function otpGen(len, expMins) {
  let otp = '';
  for (let i = 0; i < len; i++) {
    otp += Math.floor((Math.random() * 9) + 1);
  }
  const expireAt = new Date();
  expireAt.setMinutes(expireAt.getMinutes() + expMins);
  const result = { otp : +otp, expireAt };
  console.log(result);
  return result;
}

  


// const OTP = require('./models/otpModel'); // Import your OTP model




