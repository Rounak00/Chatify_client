
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthPage from './pages/auth/AuthPage'
import './App.css'
import ErrorPage from "./pages/error/ErrorPage"
import ProfilePage from "./pages/profile/ProfilePage"
import ChatPage from "./pages/chat/ChatPage"

function App() {
 
  return (
    <>
      <BrowserRouter>
     <Routes>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
