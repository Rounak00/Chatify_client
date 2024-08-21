import { toast } from "@/components/ui/use-toast";
import { useAppStore } from "@/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ContactContainer from "./__components/ContactContainer";
import EmptyChatContainer from "./__components/EmptyChatContainer";
import ChatContainer from "./__components/ChatContainer";

const ChatPage = () => {
  const {userInfo,selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  }=useAppStore();
  const navigate=useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast({title: "Please setup your profile first, to continue chatting"});
      navigate("/profile")
    }
  },[userInfo,navigate])
  return (
    <div className="flex text-white overflow-hidden h-[100vh]">
      {isUploading && 
      <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
        <h5 className="text-5xl animate-pulse">Uploading File</h5>
        {fileUploadProgress}%
      </div>}
      {isDownloading && 
      <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
        <h5 className="text-5xl animate-pulse">Downloading File</h5>
        {fileDownloadProgress}%
      </div>}
      <ContactContainer/>
      {selectedChatType===undefined? 
      ( <EmptyChatContainer/>):
      (  <ChatContainer/> )
      }
    </div>
  )
}

export default ChatPage