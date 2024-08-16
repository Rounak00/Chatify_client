import { useAppStore } from "../store"
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

export const PrivateRoute= ({children}) => {
    const {userInfo}=useAppStore()
    const isauthenticated=!!userInfo;
    return isauthenticated?<>{children}</>:<><Navigate to="/auth"/></>
        
}

export const AuthRoute= ({children}) => {
  const {userInfo}=useAppStore()
  const isauthenticated=!!userInfo;
  return isauthenticated?(<Navigate to="/chat"/>):children
     
}
PrivateRoute.propTypes={
  children:PropTypes.any
}
AuthRoute.propTypes={
  children:PropTypes.any
}