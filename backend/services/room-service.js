const RoomModel = require("../models/room-model");

// Each functionalties/operation to perfom in rooms
class RoomService {
  // For creating an room
  async create(payload) {
    const { topic, roomType, ownerId } = payload;
    //Storing in db
    const room = await RoomModel.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });

    return room;
  }

  // Operation to fetch all rooms from db
  async getAllRooms(types) {
    const rooms = await RoomModel.find({ roomType: { $in: types } })
      .populate("speakers")
      .populate("ownerId")
      .exec();

    return rooms;
  }

  async getRoom(roomId) {
    const room = await RoomModel.findOne({ _id: roomId });
    return room;
  }
}

module.exports = new RoomService();
