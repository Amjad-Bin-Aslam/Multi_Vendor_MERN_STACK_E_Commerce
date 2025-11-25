import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from "../components/Products/ProductDetails"
import SuggestedProduct from '../components/Products/SuggestedProduct'
import { useSelector } from 'react-redux'

const ProductDetailsPage = () => {

  const productState = useSelector((state) => state.product || {})
  const { allProducts  } = productState

  const { id } = useParams()
  const [data , setData] = useState(null)

  useEffect(()=>{
    if (Array.isArray(allProducts) && allProducts.length > 0) {
      const found = allProducts.find((item) => item._id === id)
      setData(found)
    } 
  },[allProducts, id]) 

  

  console.log(allProducts)

  return (
    <div>
      <Header />
      <ProductDetails data = {data} />
      {
        data && <SuggestedProduct data = {data} />
      }
      <Footer />
    </div>
  )
}

export default ProductDetailsPage
