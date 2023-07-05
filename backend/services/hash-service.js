const crypto = require("crypto");

// Services for hashing the data
class HashService {
  // Function for hashing the otp
  hashOtp(data) {
    return crypto
      .createHmac("sha256", process.env.HASH_SECRET)
      .update(data)
      .digest("hex");
  }
}

module.exports = new HashService();
