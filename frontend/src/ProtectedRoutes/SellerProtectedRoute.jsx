import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'

const SellerProtectedRoute = ({ children }) => {
  const { isSeller, isLoading } = useSelector((state) => state.seller)

  if (isLoading) return null

  if (!isSeller) {
    return <Navigate to={`/shop-login`} replace />
  }

  return children
}

export default SellerProtectedRoute; 
 