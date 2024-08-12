import { toast } from "@/components/ui/use-toast";
import { useAppStore } from "@/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

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
    <div>This is our chat page</div>
  )
}

export default ChatPage