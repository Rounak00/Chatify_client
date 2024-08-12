import { useAppStore } from "@/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Avatar,  AvatarImage } from "@/components/ui/avatar"
import { colors, getColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;


const ProfilePage = () => {
  const navigate = useNavigate;
  const { userInfo, setUserInfo } = useAppStore();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const saveChanges = async () => {};
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer"/>
        </div>
        <div className="grid grid-cols-2">
          <div className="h-full w-32 md:h-48 relative flex items-center justify-center"
              onMouseEnter={()=>setHovered(true)}
              onMouseLeave={()=>setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden">
              {image? 
              (<AvatarImage src={image} 
                            alt="Profile Image"
                            className="object-cover w-full h-full bg-black"/>):
              (<div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
              {fname? fname.split("").shift():
              userInfo.email.split("").shift()}</div>
              )}
            </Avatar>
            {hovered && (<div className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer rounded-full ring-fuchsia-50">
                {image? 
                <FaTrash className="text-white text-3xl cursor-pointer "/>
                :
                <FaPlus className="text-white text-3xl cursor-pointer "/>}
            </div>)}
            {/*<input/>*/}
          </div>
           <div className="flex min-w-32 md:min-w-64 flex-col gap-6 text-white items-center justify-center">
                 <div className="w-full">
                  <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-lg p-6 bg-[#2c2e3b]"/>
                 </div>
                 <div className="w-full">
                  <Input placeholder="First Name" type="text"  value={fname} className="rounded-lg p-6 bg-[#2c2e3b]" onChange={(e)=>setFname(e.target.value)}/>
                 </div>
                 <div className="w-full">
                  <Input placeholder="Last Name" type="text" value={lname} className="rounded-lg p-6 bg-[#2c2e3b] " onChange={(e)=>setLname(e.target.value)}/>
                 </div>
                 <div className="flex w-full gap-5">
                  {colors.map((color,index)=>(
                     <div key={index} className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor===index?"outline":""}`}
                     onClick={()=>setSelectedColor(index)}
                     ></div>
                  ))}
                 </div>
           </div>
        </div>
        <div className="w-full ">
          <Button
           className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
           onClick={saveChanges}
          >Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
