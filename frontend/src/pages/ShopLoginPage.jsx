import React from 'react'
import ShopLogin from '../components/Shop/ShopLogin.jsx'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ShopLoginPage = () => {

  const navigate = useNavigate()
  const { isSeller, shop } = useSelector((state) => state.seller)

  useEffect(() => {

    if (isSeller === true && shop && shop._id) {
      navigate(`/shop/${shop._id}`)
    }

  }, [isSeller, shop, navigate])

  return ( 
    <div>
      <ShopLogin />
    </div>
  )
}

export default ShopLoginPage

