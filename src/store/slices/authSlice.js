import {devtools} from "zustand/middleware";
export const createAuthSlice=devtools((set)=>({ 
    userInfo:undefined,
    setUserInfo: (userInfo)=>set({userInfo})
}),{name:"UserSlice"})
