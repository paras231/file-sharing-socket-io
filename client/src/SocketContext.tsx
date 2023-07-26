import { useState, useEffect, createContext } from "react";
import { io } from "socket.io-client";

const initialState: {
  socket: any;
  notification: { text: string };
  receivedFile: any;
} = {
  socket: null,
  notification: { text: "" },
  receivedFile: null,
};
type socketContextProps = {
  children: React.ReactNode;
};

export const SocketContext = createContext(initialState);

export const SocketContextProvider = ({ children }: socketContextProps) => {
  const [newSocket, setSocket] = useState(null);
  const [notification, setNotification] = useState({
    text: "",
  });
  const [receivedFile, setFile] = useState(null);
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
  });

  return (
    <>
      <SocketContext.Provider
        value={{
          socket: newSocket,
          notification: notification,
          receivedFile: receivedFile,
        }}
      >
        {children}
      </SocketContext.Provider>
    </>
  );
};
