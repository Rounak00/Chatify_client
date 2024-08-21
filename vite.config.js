import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

 
// const manifestForPlugin={
//    registerTypes:"prompt",
//    includeAssets:['favicon.ico',"apple-touch-icon.png","masked-icon.png"],
//    manifest:{
//     name:"Chatify",
//     short_name:"Chatify",
//     description:"It is a simple chatting application build on the top of MERN Stack with SocketIO for websocket, Zustand and ContextAPI for State management",
//     icons:[
//       {
//         src: "/logo192.png",
//         sizes: "192x192",
//         type: "image/png",
//      },{
//         src: "/logo512.png",
//         sizes: "512x512",
//         type: "image/png",
//         purpose: "favicon"
//      },
//      {
//         src: "/apple-touch-icon.png",
//         sizes: "180x180",
//         type: "image/png",
//         purpose: "apple touch icon"
//      },
//      {
//         src: "/logo144.png",
//         sizes: "144x144",
//         type: "image/png",
//         purpose: "any"
//      },
//      {
//         src: "/logo256.png",
//         sizes: "256x256",
//         type: "image/png",
//         purpose: "icon"
//      },
//      {
//         src: "/logo384.png",
//         sizes: "384x384",
//         type: "image/png",
//         purpose: "any maskable"
//      }
//     ],
//     theme_color:"#181818",
//     background_color:"#e8eac2",
//     display:"standalone",
//     scope:"/",
//     start_url:"/",
//     orientation:"portrait",
//    }
// }

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
})