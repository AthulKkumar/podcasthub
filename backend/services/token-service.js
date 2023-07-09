const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refresh-model");

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecrcet = process.env.JWT_REFRESH_TOKEN_SECRET;

// Services for generating the tokens
class TokenService {
  // Function for generating the token for user enterd data
  generateToken(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1m",
    });

    const refreshToken = jwt.sign(payload, refreshTokenSecrcet, {
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

  async verifyRefreshToken(refershtoken) {
    return await jwt.verify(refershtoken, refreshTokenSecrcet);
  }

  async findRefreshToken(userId, refershToken) {
    return await refreshModel.findOne({
      userId: userId,
      token: refershToken,
    });
  }

  async updateRefreshToken(userId, refershToken) {
    return await refreshModel.updateOne(
      { userId: userId },
      { token: refershToken }
    );
  }

  async removeToken(refershToken) {
    return await refreshModel.deleteOne({ token: refershToken });
  }
}

module.exports = new TokenService();
