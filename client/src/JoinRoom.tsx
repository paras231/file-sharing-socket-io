import React, { useState, useContext } from "react";
import { SocketContext } from "./SocketContext";
const JoinRoom = () => {
  const { socket, notification, receivedFile } = useContext(SocketContext);
  const [joinData, setJoinData] = useState({
    deviceName: "",
    roomName: "",
  });
  const [file, setFile] = useState(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJoinData({ ...joinData, [name]: value });
  };
  // join or create a room->

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      socket?.emit("join_room", joinData, (err: Error) => {
        if (err) {
          alert(err.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(notification);
  const { text } = notification;

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const sendFile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      socket?.emit("send_file", file, (err: Error) => {
        if (err) {
          alert(err.message);
        }
      });
    } catch (error) {
      alert(error);
    }
  };
  console.log(receivedFile);

  const downloadFile = async (filePath: string) => {
    try {
      if (receivedFile) {
        const link = document.createElement("a");
        link.href = receivedFile;
        // get file extn->
        const type = receivedFile.split(";")[0].split("/")[1];
        link.download = `myfile.${type}`;

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2>{text}</h2>

      <form onSubmit={handleJoinRoom}>
        <input
          required
          type="text"
          placeholder="Device Name"
          name="deviceName"
          value={joinData.deviceName}
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="Room Name"
          name="roomName"
          value={joinData.roomName}
          onChange={handleChange}
        />
        <button type="submit">Join</button>
      </form>

      <form onSubmit={sendFile}>
        <input onChange={changeFile} type="file" />
        <button type="submit">Send File</button>
      </form>
      {receivedFile && (
        <img
          src={receivedFile}
          style={{ height: "20vh", width: "20vw" }}
          alt=""
        />
      )}
      <button onClick={() => downloadFile("examplefile")}>Download File</button>
    </>
  );
};

export default JoinRoom;
