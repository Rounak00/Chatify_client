
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/toaster"
import App from './App.jsx'
import './index.css'
import { SocketProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <App />
    <Toaster closeButton/>
  </SocketProvider>
)
