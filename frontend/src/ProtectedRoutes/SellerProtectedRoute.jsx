import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import Loader from "../components/Layout/Loader"

const SellerProtectedRoute = ({ children }) => {
  const { isSeller, isLoading, shop } = useSelector((state) => state.seller)

    if (isLoading === true) {
      return (
        <Loader />
      )
    }

    if (!isSeller || !shop) {
      return <Navigate to={`/shop-login`} replace />
    }


    return children


};

export default SellerProtectedRoute;
