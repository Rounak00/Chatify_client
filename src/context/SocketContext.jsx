import { useAppStore } from "@/store";
import { createContext, useContext, useRef, useEffect } from "react";
import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SocketContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  return useContext(SocketContext);
};

// eslint-disable-next-line react/prop-types
export const SocketProvider = ({children}) => {
  const socket = useRef();
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(SERVER_URL, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });

      const handleRecieveMessage=(message)=>{
        const {selectedChatData, selectedChatType,addMessage}=useAppStore.getState();
        if(selectedChatType!==undefined && 
          (selectedChatData._id===message.sender._id ||
          selectedChatData._id === message.recipient._id))
          { 
            addMessage(message)
          }
      }
      const handleReceiveChannelMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState();
        if (selectedChatType !== undefined && 
            selectedChatData._id === message.channelId) {
          console.log("ch msg rcv", message);
          addMessage(message);
        }
      }

      socket.current.on("recieveMessage",handleRecieveMessage)
      socket.current.on("receive-channel-message",handleReceiveChannelMessage)
      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
