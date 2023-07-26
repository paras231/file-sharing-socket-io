import { useState, useEffect, createContext } from "react";
import { io } from "socket.io-client";

const initialState: {
  socket: any;
} = {
  socket: null,
};
type socketContextProps = {
  children: React.ReactNode;
};

export const SocketContext = createContext(initialState);

export const SocketContextProvider = ({ children }: socketContextProps) => {
  const [newSocket, setSocket] = useState(null);

  let socket: any;
  useEffect(() => {
    socket = io("http://localhost:5000");

    setSocket(socket);
    socket.on("connection", () => {
      console.log("socket connected", socket);
    });
  }, []);

  return (
    <>
      <SocketContext.Provider
        value={{
          socket: newSocket,
        }}
      >
        {children}
      </SocketContext.Provider>
    </>
  );
};
