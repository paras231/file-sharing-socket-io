import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { addDevice, getDevice, getDevicesInRoom } from "./users.js";
const PORT = 5000;
const app = express();

const server = http.createServer(app);

app.use(express.json({ limit: "500mb" }));
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
  maxHttpBufferSize: 1e8,
});

const devices = [];
const device = {};
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join_room", (data, callback) => {
    devices.push(data);
    //  join the room->
    socket.join(data.roomName);
    // emit notification event after joining->
    socket
      .to(data.roomName)
      .emit("notify", { text: `device ${data.deviceName} connected` });
  });

  //  send file after joining->
  socket.on("send_file", (file, callback) => {
    const device = devices.map((device) => device.roomName);
    console.log(file);
    socket.to(device[0]).emit("receive_file", file);
  });

  socket.on("disconnect", () => {
    console.log("user left");
  });
});

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
