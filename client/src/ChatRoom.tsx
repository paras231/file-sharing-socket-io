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

  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const [userId, setUserId] = useState<string>(socket?.id);
  async function handleJoinRoom(e: React.FormEvent) {
    e.preventDefault();
    try {
      socket?.emit("room_join", userName, roomName);
      setUserName("");
      setRoomName("");
      setHasJoined(true);
    } catch (error) {
      console.log(error);
    }
  }

  const { usersInRoom,joiningMessage } = useContext(SocketContext);
  console.log(usersInRoom);
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
        <span>
          File :{" "}
          <a href={`${receivedFile}`} target="_blank">
            Download file
          </a>
        </span>
        {hasJoined ? (
          <DisplayRoom
            roomName={roomName}
            userId={userId}
            hasJoined={hasJoined}
            setHasJoined={setHasJoined}
            usersInRoom={usersInRoom}
            joiningMsg={joiningMessage}
          />
        ) : (
          <Joinroom
            joinHandler={handleJoinRoom}
            userName={userName}
            setUserName={setUserName}
            roomName={roomName}
            setRoomName={setRoomName}
          />
        )}
      </main>
    </>
  );
};

export default ChatRoom;

interface JoinRoomProps {
  joinHandler: React.FormEventHandler;
  userName: string;
  setUserName: (value: string) => void;
  roomName: string;
  setRoomName: (value: string) => void;
}
function Joinroom({
  joinHandler,
  userName,
  setUserName,
  roomName,
  setRoomName,
}: JoinRoomProps) {
  return (
    <>
      <form onSubmit={joinHandler}>
        <input
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Enter your name..."
        />
        <input
          required
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          type="text"
          placeholder="Enter room name..."
        />
        <button type="submit">Join Room</button>
      </form>
    </>
  );
}

// show a room after user has joined-:

interface DisplayProps {
  userId: string;
  hasJoined: boolean;
  setHasJoined: (value: boolean) => void;
  usersInRoom?: [];
  roomName: string;
  joiningMsg:string;
}

function DisplayRoom({
  userId,
  hasJoined,
  setHasJoined,
  usersInRoom,
  roomName,
  joiningMsg
}: DisplayProps) {
  return (
    <>
      <h1>Entered in {roomName}</h1>
      <div>
        <h3>Users inside this room</h3>
        <span style={{color:'red'}}>{joiningMsg}</span>
        {
          usersInRoom?.map((user:any)=>{
            return (
              <div key={user.userid}>
               
               <span>{user.userName}</span>
              </div>
            )
          })
        }
      </div>
    </>
  );
}
