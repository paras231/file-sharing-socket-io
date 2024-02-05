import { useState, useEffect, createContext,useRef } from "react";
import { io } from "socket.io-client";
const initialState: {
  socket: any;
  notification: { text: string };
  receivedFile: any;
  streamData: any;
  file:any | string;
  usersInRoom:[] | any;
  joiningMessage:string;
} = {
  socket: null,
  notification: { text: "" },
  receivedFile: null,
  streamData: null,
  file:null,
  usersInRoom:[],
  joiningMessage:''
};
type socketContextProps = {
  children: React.ReactNode;
};

export const SocketContext = createContext(initialState);

export const SocketContextProvider = ({ children }: socketContextProps) => {

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const [newSocket, setSocket] = useState(null);
  const [notification, setNotification] = useState({
    text: "",
  });
  const [receivedFile, setFile] = useState(null);
  const [streamData, setStream] = useState(null);
  const[usersInRoom,setUsersInRoom] = useState([]);
  const[joiningMessage,setJoiningMesg] = useState("");
  const videoRef = useRef(null);

// ...



  let socket: any;
  useEffect(() => {
    socket = io("http://localhost:5000");

    setSocket(socket);
    socket.on("connection", () => {
      console.log("socket connected", socket);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("notify", (res: any) => {
      setNotification(res);
    });
  });

  useEffect(() => {
    socket?.on("receive_file", (file: any) => {
      setFile(file);
    });
  },[]);


  // get file from server by cloudinary url

  useEffect(()=>{
    socket?.on("send_file",(url:string|any)=>{
      setFile(url);
    })
  })
  
  // set users in room-:

  useEffect(()=>{
    socket?.on("room_joined",(users:[])=>{
      console.log(users)
      setUsersInRoom(users);
      
    })
  });

  // get joining message

  useEffect(()=>{
    socket?.on("joining_message",(msg:string)=>{
setJoiningMesg(msg);
    })
  })

  return (
    <>
      <SocketContext.Provider
        value={{
          socket: newSocket,
          notification: notification,
          receivedFile: receivedFile,
          streamData: streamData,
          file:receivedFile,
          usersInRoom:usersInRoom,
          joiningMessage:joiningMessage
        }}
      >
        {children}
      </SocketContext.Provider>
    </>
  );
};
