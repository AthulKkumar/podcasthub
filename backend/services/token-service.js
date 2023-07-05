const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSercet = process.env.JWT_REFRESH_TOKEN_SECRET;

// Services for generating the tokens
class TokenService {
  // Function for generating the token for user enterd data
  generateToken(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, refreshTokenSercet, {
      expiresIn: "1y",
    });

    return { accessToken, refreshToken };
  }
}

module.exports = new TokenService();
