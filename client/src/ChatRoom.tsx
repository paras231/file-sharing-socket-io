import { useState, useContext } from "react";
import { SocketContext } from "./SocketContext";
import "./chatroom.css";
const ChatRoom = () => {
  const { socket, receivedFile } = useContext(SocketContext);
  const [file, setFile] = useState<File>();
  function uniqueId() {
    let str = "hhhdjavsnawrqtwpvsdhdjs";
    let id = Math.random() + str;
    return id;
  }

  function joinRoom() {
    socket?.emit("join", uniqueId());
  }

  function sendFile() {
    socket.emit("file_share", file);
  }

  return (
    <>
      <main>
        {/* <button onClick={joinRoom}>Join Room</button> */}

        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const fileList = e.target.files;

            if (fileList && fileList.length > 0) {
              // Assuming you want to set the first file in the list
              setFile(fileList[0]);
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.readyState === 2) {
                  // @ts-ignore
                  setFile(reader.result);
                }
              };
              // @ts-ignore
              reader.readAsDataURL(e.target.files[0]);
            }
          }}
        />
        <button onClick={sendFile}>Send file</button>
        <span>File :  <a href={`${receivedFile}`} target="_blank">Download file</a></span>
        <form></form>
      </main>
    </>
  );
};

export default ChatRoom;
