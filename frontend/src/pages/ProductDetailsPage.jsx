import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from "../components/Products/ProductDetails"
import { productData } from '../static/data'

const ProductDetailsPage = () => {

  const { name } = useParams()
  const [data , setData] = useState(null)
  const productName = name.replace(/-/g, " ")

  useEffect(()=>{
    const data = productData.find((item) => item.name === productName);
    setData(data)
  },[])

  console.log(name)

  return (
    <div>
      <Header />
      <ProductDetails data = {data} />
      <Footer />
    </div>
  )
}

export default ProductDetailsPage
