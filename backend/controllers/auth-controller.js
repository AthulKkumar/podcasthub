const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ message: "phone is required" });
    }

    const otp = await otpService.getOtp();

    // Hash the phone number, otp, and expiry time
    const ttl = 1000 * 60 * 3; // 3 minutes in milliseconds
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);

    // Send the OTP to the user
    try {
      // await otpService.sendSms(phone, otp);
      res.status(200).json({ hash: `${hash}.${expires}`, phone, otp });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "message sending failed" });
    }

    // res.json({ hash });
  }

  async verifyOtp(req, res) {
    const { phone, hash, otp } = req.body;

    if (!phone || !hash || !otp) {
      res.status(400).json({ message: "phone, hash, and otp are required" });
    }

    const [hashedOtp, expires] = hash.split(".");

    if (Date.now() > +expires) {
      res.status(400).json({ message: "otp expired" });
    }

    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      res.status(400).json({ message: "Invalid Otp" });
    }

    let user;

    try {
      user = await userService.findUser({ phone });

      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Db Error" });
    }

    // Token
    const { accessToken, refreshToken } = tokenService.generateToken({
      _id: user._id,
      activated: false,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.json({ accessToken });
  }
}

module.exports = new AuthController(); // Singleton instance
