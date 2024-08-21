/* eslint-disable react/prop-types */
import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };
  return (
    <div className="mt-5 ">
      {contacts.map((contact) => (
        <div
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer flex gap-4 ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
          key={contact._id}
          onClick={() => handleClick(contact)}
        >
          <div className="flex  gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                {contact.image ? (
                  <AvatarImage
                    src={`${SERVER_URL}/${contact.image}`}
                    alt="Profile Image"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={` ${selectedChatData && selectedChatData._id === contact._id ? 
                      "bg-[#ffffff22] border border-white/70"  :getColor(contact.color)} 
                      uppercase h-10 w-10  border-[1px] flex items-center justify-center rounded-full text-lg `}
                  >
                    {contact.fname
                      ? contact.fname.split("").shift()
                      : contact.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            )}
            {isChannel && (
              <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : (
              <div className="flex flex-col justify-center">
                <span>
                  {
                  contact.fname &&
                  contact.lname
                    ? `${contact.fname} ${contact.lname}`
                    : `${contact.email}`}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
