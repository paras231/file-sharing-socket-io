import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import ss from "socket.io-stream";
import dotenv from 'dotenv';
import cloudinary from "./utils/cloudinraryConfig.js";
import { addDevice, getDevice, getDevicesInRoom } from "./users.js";

dotenv.config();

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


let users = [];

io.on("connection", (socket) => {
  console.log(socket.id);
 
socket.on("join",(userId)=>{
  users.push(userId);
  console.log(users);
  //  perform any operations with users data here-:
});

//  get sent file from client side

socket.on("file_share",async(file)=>{
  
  //  process the received file and save to cloudinary
const result =  await cloudinary.v2.uploader.upload(file);
// now process the file url from result and send it back to client
  socket.emit('send_file',result.secure_url);
})

  socket.on("disconnect", () => {
    console.log("user left");
  });
});

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
