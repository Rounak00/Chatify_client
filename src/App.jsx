import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
 
} from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import "./App.css";
import ProfilePage from "./pages/profile/ProfilePage";
import ChatPage from "./pages/chat/ChatPage";
import { AuthRoute, PrivateRoute } from "./Private";
import { useEffect, useState } from "react";
import { useAppStore } from "./store";
import axios from "axios";


const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getUserData = async () => {
      try {

        const isExist = JSON.parse(localStorage.getItem("chatify"));

          const response = await axios.get(`${SERVER_URL}/user_info`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${isExist}`,
            },
          });
          if (response.data.id && response.status === 200) {
            setUserInfo({...response.data,access_token:isExist});
          
          } else {
            setUserInfo(undefined);
          }
        
      } catch (err) {
        console.log(err);
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };
    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading ... </div>;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
            {/*noToken && <Navigate to="/auth" />*/}
          <Route
            path="/auth"
            element={
              <AuthRoute>
                <AuthPage />
              </AuthRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
