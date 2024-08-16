import { toast } from "@/components/ui/use-toast";
import { useAppStore } from "@/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ContactContainer from "./__components/ContactContainer";
import EmptyChatContainer from "./__components/EmptyChatContainer";
import ChatContainer from "./__components/chatContainer";

const ChatPage = () => {
  const {userInfo}=useAppStore();
  const navigate=useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast({title: "Please setup your profile first, to continue chatting"});
      navigate("/profile")
    }
  },[userInfo,navigate])
  return (
    <div className="flex text-white overflow-hidden h-[100vh]">
      <ContactContainer/>
      {/* <EmptyChatContainer/> */}
      <ChatContainer/>
    </div>
  )
}

export default ChatPage