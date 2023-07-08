const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refresh-model");

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

  async storeRefreshToken(token, userId) {
    try {
      await refreshModel.create({
        token,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async verifyAccessToken(token) {
    return await jwt.verify(token, accessTokenSecret);
  }
}

module.exports = new TokenService();
