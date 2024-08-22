import PropTypes from 'prop-types';
import ProfileInfo from './ProfileInfo';
import NewDM from './NewDM';
import { useEffect } from 'react';
import axios from 'axios';
import { useAppStore } from '@/store';
import ContactList from '@/components/ContactList';
import CreateChannel from './CreateChannel';


const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ContactContainer = () => {
  const {setDirectMessagesContacts,directMessagesContacts,channels,setChannels,userInfo}=useAppStore();
  useEffect(()=>{
    // /contact/get_contacts_for_DM
    const getContacts=async()=>{
       try{
        const response=await axios.get(`${SERVER_URL}/contact/get_contacts_for_DM`,{headers: { Authorization: `Bearer ${userInfo.access_token}`},withCredentials:true})
        
        if(response.data.contacts){
          setDirectMessagesContacts(response.data.contacts)
        }
       }catch(err){console.error(err)}
    }
    const getChannels=async()=>{
      try{
        const response=await axios.get(`${SERVER_URL}/contact/get_user_channels`,{headers: { Authorization: `Bearer ${userInfo.access_token}`},withCredentials:true})
        
        if(response.data.channels){
          setChannels(response.data.channels)
        }
       }catch(err){console.error(err)}
    }
    getContacts();
    getChannels();
  },[]) //channel - directmessagecontacts
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] w-full bg-[#1b1c24] border-r-2 border-[#2f303b]">
       <div className="pt-3">
        <Logo/>
       </div>
       <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM/>
        </div>
        <div className='max-h-[38vh] overflow-y-auto scrollbar-hidden'>
          <ContactList contacts={directMessagesContacts}/>
        </div>
       </div>
       <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
          <CreateChannel/>
        </div>
        <div className='max-h-[38vh] overflow-y-auto scrollbar-hidden'>
          <ContactList contacts={channels} isChannel={true}/>
        </div>
       </div>
       <ProfileInfo/>
    </div>
  )
}

const Logo = () => {
    return (
      <div className="flex p-5  justify-start items-center gap-2">
        <svg
          id="logo-38"
          width="78"
          height="32"
          viewBox="0 0 78 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
            className="ccustom"
            fill="#8338ec"
          ></path>{" "}
          <path
            d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
            className="ccompli1"
            fill="#975aed"
          ></path>{" "}
          <path
            d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
            className="ccompli2"
            fill="#a16ee8"
          ></path>{" "}
        </svg>
        <span className="text-3xl font-semibold ">Chatify</span>
      </div>
    );
  };
  
const Title=({text})=>{
    return (
        <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">{text}</h6>
    )
}  

Title.propTypes={
    text:PropTypes.string,
}

export default ContactContainer