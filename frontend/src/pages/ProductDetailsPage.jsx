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

  const { name } = useParams()
  const [data , setData] = useState(null)
  const productName = name.replace(/-/g, " ")

  useEffect(()=>{
    if (Array.isArray(allProducts) && allProducts.length > 0) {
      const found = allProducts.find((item) => item.name === productName)
      setData(found)
    } 
  },[allProducts, productName])

  

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
