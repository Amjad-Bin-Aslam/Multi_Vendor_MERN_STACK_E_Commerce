import React from 'react'
import ShopCreate from '../components/Shop/ShopCreate'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const ShopCreatePage = () => {

  const navigate = useNavigate()
  const { isSeller, isLoading , shop } = useSelector((state) => state.seller)

  useEffect(() => {
    if( !isLoading && isSeller && shop){
      navigate(`/shop/${shop._id}`)
    }
  }, [isSeller, shop, navigate,isLoading]) 

  return (
    <div>
      <ShopCreate /> 
    </div>
  )
}

export default ShopCreatePage
