const Jimp = require("jimp");
const path = require("path");
const userService = require("../services/user-service");
const UserDto = require("../dtos/user-dto");

// This is for Semiprotected routes
class ActivateController {
  async activate(req, res) {
    const { name, avatar } = req.body;

    if (!name || !avatar) {
      res.status(400).json({ meassage: "All fields are required" });
    }

    //Image Base64
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/png;base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    try {
      // Compressing the image
      const jimpResp = await Jimp.read(buffer);

      jimpResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (error) {
      res.status(500).json({ message: "coud not proccess image" });
    }

    const userId = req.user._id;

    // Updating the user

    try {
      const user = await userService.findUser({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: "User Not found" });
      }

      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();

      res.json({ user: new UserDto(user), auth: true });
    } catch (error) {
      return res.status(500).json({ message: "Db error" });
    }
  }
}

module.exports = new ActivateController();
