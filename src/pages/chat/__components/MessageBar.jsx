import { useSocket } from "@/context/SocketContext";
import { useAppStore } from "@/store";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";


// import createHistory from 'history/createBrowserHistory'

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const MessageBar = () => {
  const emojiRef=useRef(); 
  const fileInputRef=useRef();
  const socket=useSocket();
  
  
  const {selectedChatType,selectedChatData,userInfo,setIsUploading,setFileUploadProgress}=useAppStore(); 
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

 
    
  

  useEffect(()=>{
    function handleClickOutside(event){
        if(emojiRef.current && !emojiRef.current.contains(event.target)){
            setEmojiPickerOpen(false);
        }
      }
    addEventListener("mousedown",handleClickOutside);
    return ()=>{
            document.removeEventListener("mousedown",handleClickOutside);
      }
    
  },[emojiRef])

  const handleAddEmoji=(emoji)=>{
    setMessage((msg)=>msg+emoji.emoji)
  }
  const handleSendMessage=async()=>{
    if (!socket) {
      console.error("Socket is not connected");
      return;}
    else{ 
    if(selectedChatType==='contact'){
      socket.emit("sendMessage",{
        sender:userInfo.id,
        content:message,
        recipient:selectedChatData._id,
        messageType:"text",
        fileUrl:undefined,
      });
    }else if(selectedChatType==='channel'){
      socket.emit("send-channel-message",{
        sender:userInfo.id,
        content:message,
        messageType:"text",
        fileUrl:undefined,
        channelId:selectedChatData._id,
      });
    }
    setMessage("");
  }
  }
  const handleAttachmentClick=()=>{
    if(fileInputRef.current){
      fileInputRef.current.click()
    }
  }
  const handleAttachmentChange=async(event)=>{
       try{
        const file=event.target.files[0];
        if(file){
            const formData=new FormData();
            formData.append("file",file);
            setIsUploading(true);
            const response=await axios.post(`${SERVER_URL}/message/upload_file`,formData,{withCredentials:true,
            onUploadProgress:data=>{setFileUploadProgress(Math.round((100*data.loaded)/data.total))}});
            if(response.status===200 && response.data){
              setIsUploading(false);
              if(selectedChatType==="contact"){
                socket.emit("sendMessage",{
                  sender:userInfo.id,
                  content:undefined,
                  recipient:selectedChatData._id, 
                  messageType:"file",
                  fileUrl:response.data.filePath,
                })
              }else if(selectedChatType==='channel'){
                socket.emit("send-channel-message",{
                  sender:userInfo.id,
                  content:undefined,
                  messageType:"file",
                  fileUrl:response.data.filePath,
                  channelId:selectedChatData._id,
                });
              }
            } 
            
        }
        
       }catch(err){
        setIsUploading(false);
        console.log(err)}
  }
  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 md-6 gap-6">
      <div className="flex-1 flex bg-[#282b33] rounded-md gap-5 items-center pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Type your message ..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300" onClick={handleAttachmentClick}>
          <GrAttachment className="text-2xl" />
        </button>
        <input type="file" className="hidden" ref={fileInputRef} onChange={(e)=>handleAttachmentChange(e)}/>
        <div className="relative">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300" onClick={()=>setEmojiPickerOpen(true)}>
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker theme="dark" open={emojiPickerOpen} onEmojiClick={handleAddEmoji} autoFocusSearch={false}/>
          </div>
        </div>
      </div>
          <button className="bg-[#8417ff] flex justify-center items-center p-5 rounded-md focus:border-none focus:outline-none focus:text-white transition-all duration-300 hover:bg-[#741bda]  focus:bg-[#741bda]" onClick={handleSendMessage}>
            <IoSend className="text-2xl" />
          </button>
    </div>
  );
};

export default MessageBar;
