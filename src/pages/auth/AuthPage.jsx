import axios from "axios";
import loginPNG from "@/assets/login.png";
import victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import favicon from "/favicon.ico"
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AuthPage = () => {
  const navigate=useNavigate();
  const {setUserInfo}=useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast()

  const validateSignup=()=>{
    if(!email.length){
      toast({
        variant: "destructive",
        title: "Please enter your email",})
        return false;
    }
    if(!password.length){
      toast({
        variant: "destructive",
        title: "Please enter your paswword",})
        return false;
    }
    if(!confirmPassword.length || password!=confirmPassword){
      toast({
        variant: "destructive",
        title: "Password and confirm password should be same",})
        return false;
    }

    return true;
  }
  const validateLogin=()=>{
    if(!email.length){
      toast({
        variant: "destructive",
        title: "Please enter your email",})
        return false;
    }
    if(!password.length){
      toast({
        variant: "destructive",
        title: "Please enter your paswword",})
        return false;
    }
   return true;
  }
  const handleSignup=async()=>{
    
    try{
      if(validateSignup()){
        const response=await axios.post(`${SERVER_URL}/signup`,{email,password},{withCredentials:true});
        if(response.status===201){
          localStorage.setItem("chatify", JSON.stringify(response.data.access_token));
          setUserInfo(response.data)
          navigate("/profile")
        }
      }
    }catch(err){
      console.log(err.message);
    }
     
  }
  const handleLogin=async()=>{
    try{
      if(validateLogin()){
        const response=await axios.post(`${SERVER_URL}/login`,{email,password},{withCredentials:true});
        if(response.data.id){
          localStorage.setItem("chatify", JSON.stringify(response.data.access_token));
          setUserInfo(response.data)
          if(response.data.profileSetup){navigate("/chat")}
          else {navigate("/profile")}
        }
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="flex h-[100vh] w-[100vw] justify-center items-center">
      <div className="h-[80vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 max-sm:w-[100vw]">
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex justify-center items-center flex-col">
            <div className="flex items-center justify-around w-full">
              <img src={favicon} alt="Chat Logo" className="h-[35px] mr-4 " />
              <h1 className="text-3xl font-bold md:text-4xl max-sm:text-2xl">Welcome User</h1>
              <img src={victory} alt="Victory SVG" className="h-[80px] max-sm:hidden" />
            </div>
            <p className="font-semibold text-xl text-center">Get started with  
              <span className="text-purple-600 font-semibold"> Chatify </span></p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Log In
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  value="signup"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Enter Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full p-6"
                />
                <Input
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-full p-6"
                />
                <Button className="rounded-full p-6" onClick={handleLogin}> Log In </Button>
              </TabsContent>
              <TabsContent
                className="flex flex-col gap-5 "
                value="signup"
              >
                <Input
                  placeholder="Enter Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full p-6"
                />
                <Input
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-full p-6"
                />
                <Input
                  placeholder="Enter Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-full p-6"
                />
                <Button className="rounded-full p-6" onClick={handleSignup}> Sign Up </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={loginPNG} alt="Background login" className="h-[500px]"/>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
