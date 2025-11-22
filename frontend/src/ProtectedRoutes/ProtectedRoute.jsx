import { Navigate } from "react-router-dom"
import Loader from "../components/Layout/Loader"


const ProtectedRoute = ({ isAuthenticated , children, loading }) => {

  if(loading){
    return <Loader />
  }

  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute;
