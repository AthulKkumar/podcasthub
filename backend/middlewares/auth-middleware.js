const tokenService = require("../services/token-service");

module.exports = async function (req, res, next) {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new Error();
    }

    const userData = await tokenService.verifyAccessToken(accessToken);

    if (!userData) {
      throw new Error();
    }

    req.user = userData; //Attacing the user with the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
