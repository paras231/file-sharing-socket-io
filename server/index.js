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

io.on("connection", (socket) => {
  

  

  socket.on("disconnect", () => {
    console.log("user left");
  });
});

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
