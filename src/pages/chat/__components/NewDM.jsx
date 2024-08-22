import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getColor } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOptions } from "@/lib/utils";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from "@/store";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const NewDM = () => {
  const {setSelectedChatType,setSelectedChatData,userInfo}=useAppStore();  
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContact = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await axios.post(
          `${SERVER_URL}/contact/search`,
          { searchTerm },
          { headers: { Authorization: `Bearer ${userInfo.access_token}`},withCredentials: true }
        );
        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const selectNewContact=(contact)=>{
      setOpenNewContactModel(false);
      setSelectedChatType("contact");
      setSelectedChatData(contact);
      setSearchedContacts([]);
  }
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 transition-all cursor-pointer duration-300"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 text-white p-3">
            Select new contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search contact"
              className="rounded-lg p-6 border-none bg-[#2c2e3b]"
              onChange={(e) => searchContact(e.target.value)}
            />
          </div>
          {searchedContacts.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchedContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={()=>selectNewContact(contact)}
                  >
                    <div className="w-12 h-12 relative ">
                      <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {contact.image ? (
                          <AvatarImage
                            src={`${SERVER_URL}/${contact.image}`}
                            alt="Profile Image"
                            className="object-cover w-full h-full bg-black rounded-full"
                          />
                        ) : (
                          <div
                            className={`uppercase h-12 w-12  border-[1px] flex items-center justify-center rounded-full text-lg ${getColor(
                              contact.color
                            )}`}
                          >
                            {contact.fname
                              ? contact.fname.split("").shift()
                              : contact.email.split("").shift()}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <span>
                        {contact.fname && contact.lname
                          ? `${contact.fname} ${contact.lname}`
                          : `${contact.email}`}
                      </span>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {searchedContacts.length <= 0 && (
            <div className="flex-1  md:flex flex-col justify-center items-center  duration-1000 transition-all mt-5">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
              <div className="text-opacity-80 text-white text-center flex flex-col gap-5 mt-5 items-center lg:text-2xl text-xl transition-all duration-300 ">
                <div className="poppins-medium">
                  Hi, Search new{" "}
                  <span className="text-purple-500 "> Contact </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
