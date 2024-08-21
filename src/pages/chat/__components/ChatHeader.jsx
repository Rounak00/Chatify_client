import { useAppStore } from "@/store";
import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center ">
          <div className="w-12 h-12 relative ">
            {selectedChatType === "contact" ? (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {selectedChatData.image ? (
                  <AvatarImage
                    src={`${SERVER_URL}/${selectedChatData.image}`}
                    alt="Profile Image"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-12 w-12  border-[1px] flex items-center justify-center rounded-full text-lg ${getColor(
                      selectedChatData.color
                    )}`}
                  >
                    {selectedChatData.fname
                      ? selectedChatData.fname.split("").shift()
                      : selectedChatData.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span>
              {selectedChatType==="channel" && `${selectedChatData.name}`}
              {selectedChatType === "contact" &&
              selectedChatData.fname &&
              selectedChatData.lname
                ? `${selectedChatData.fname} ${selectedChatData.lname}`
                : `${selectedChatData.email}`}
            </span>
            {selectedChatType === "contact" && (
              <span className="text-xs">{selectedChatData.email}</span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 ">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300">
            <RiCloseFill className="text-3xl" onClick={closeChat} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
