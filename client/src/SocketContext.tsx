import { useState, useEffect, createContext,useRef } from "react";
import { io } from "socket.io-client";
const initialState: {
  socket: any;
  notification: { text: string };
  receivedFile: any;
  streamData: any;
} = {
  socket: null,
  notification: { text: "" },
  receivedFile: null,
  streamData: null,
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
  const videoRef = useRef(null);

// ...



  let socket: any;
  useEffect(() => {
    socket = io("http://localhost:5000");

    setSocket(socket);
    socket.on("connection", () => {
      console.log("socket connected", socket);
    });
  }, []);

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

  

  return (
    <>
      <SocketContext.Provider
        value={{
          socket: newSocket,
          notification: notification,
          receivedFile: receivedFile,
          streamData: streamData,
          
        }}
      >
        {children}
      </SocketContext.Provider>
    </>
  );
};
