const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");

// For user Authentication purpouse
class AuthController {
  // Function for Sending the otp
  async sendOtp(req, res) {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ message: "phone is required" });
    }
    // Generating otp
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
  }

  // Function for verifying Otp
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
    // To check if the otp is valid or not
    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      res.status(400).json({ message: "Invalid Otp" });
    }
    // If it is valid then create an user
    let user;

    try {
      user = await userService.findUser({ phone });
      // To check if the user is already existing or not if not then create an new user
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Db Error" });
    }

    // Token generating
    const { accessToken, refreshToken } = tokenService.generateToken({
      _id: user._id,
      activated: false,
    });

    // Storing the refersh token in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    // Sending the user details to user dto to trim the data for essential things
    const userDto = new UserDto(user);
    res.json({ accessToken, user: userDto });
  }
}

module.exports = new AuthController(); // Singleton instance
