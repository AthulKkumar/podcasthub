const roomService = require("../services/room-service");
const RoomDto = require("../dtos/room-dto");

// All the functinalites needed to control an room
class RoomController {
  // To create an new room
  async create(req, res) {
    const { topic, roomType } = req.body;

    if (!topic || !roomType) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const room = await roomService.create({
      topic,
      roomType,
      ownerId: req.user._id,
    });

    return res.json(new RoomDto(room));
  }

  // To get all the existing rooms
  async index(req, res) {
    const rooms = await roomService.getAllRooms(["open"]);
    const allRooms = rooms.map((room) => new RoomDto(room));

    return res.json(allRooms);
  }
}

module.exports = new RoomController();
