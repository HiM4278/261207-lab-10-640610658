import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const rooms = readDB();
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  const roomsId = rooms.find((x) => x.roomId === roomId);
  const roomsIdx = rooms.findIndex((x) => x.roomId === roomId);
  const messageIdx = roomsId.messages.findIndex(
    (x) => x.messageId === messageId
  );
  if (roomsId) {
    if (messageIdx === -1) {
      res.status(404).json({ ok: false, message: "Invalid message id" });
    } else {
      rooms[roomsIdx].messages.splice(messageId, 1);
      res.status(200).json({ ok: true });
    }
  } else {
    res.status(404).json({ ok: false, message: "Invalid room id" });
  }
}
