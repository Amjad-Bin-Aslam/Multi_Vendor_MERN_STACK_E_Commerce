import React from 'react'
import ShopCreate from '../components/Shop/ShopCreate'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const ShopCreatePage = () => {

  const navigate = useNavigate()
  const { isSeller , shop } = useSelector((state) => state.seller)

  useEffect(() => {
    if(isSeller === true && shop && shop._id){
      navigate(`/shop/${shop._id}`)
    }
  } ,[])

  return (
    <div>
      <ShopCreate />
    </div>
  )
}

export default ShopCreatePage
