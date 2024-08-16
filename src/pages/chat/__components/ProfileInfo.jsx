import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { getColor } from "@/lib/utils";
import {FiEdit2} from "react-icons/fi"
import {IoPowerSharp} from "react-icons/io5" 
import axios from "axios"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ProfileInfo = () => {
const { userInfo , setUserInfo} = useAppStore();
const navigate=useNavigate()
const handleLogOut=async()=>{
  try{
    const response=await axios.post(`${SERVER_URL}/logout`,{},{withCredentials:true})
    if(response.status===200){
        setUserInfo(null);
        navigate("/auth")
    }
  }catch(err){
    console.log(err)
  }
}

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-start  w-full bg-[#2a2b33] ">
      <div className="flex gap-3 items-center justify-center ml-3">
        <div className="w-12 h-12 relative ">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${SERVER_URL}/${userInfo.image}`}
                alt="Profile Image"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12  border-[1px] flex items-center justify-center rounded-full text-lg ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.fname
                  ? userInfo.fname.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.fname && userInfo.lname
            ? `${userInfo.fname} ${userInfo.lname}`
            : ``}
        </div>
      </div>
      <div className="flex w-full items-center justify-evenly">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <FiEdit2 className="text-purple-500 text-xl font-medium" onClick={()=>navigate("/profile")}/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1d1e] border-none text-white">
              <p>Edit your profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <IoPowerSharp className="text-red-500 text-xl font-medium" onClick={handleLogOut}/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1d1e] border-none text-white">
              <p>Log Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
