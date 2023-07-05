const crypto = require("crypto");
const hashService = require("./hash-service");

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require("twilio")(smsSid, smsAuthToken, {
  lazyLoading: true,
});

// Services for Otp
class OtpService {
  // Function for generating the otp
  async getOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  // Function for sending the sms
  async sendSms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your OTP is ${otp}`,
    });
  }

  // Function for verifying the otp
  verifyOtp(hashedOtp, data) {
    const computedHash = hashService.hashOtp(data);
    // It will return True or False
    return computedHash === hashedOtp;
  }
}

module.exports = new OtpService();
