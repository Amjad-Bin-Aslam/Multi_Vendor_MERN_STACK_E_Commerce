import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProdcutsShop } from '../../redux/actions/product'

const AllProducts = () => {

    const { products , isLoading } = useSelector((state) => state.product)
    const { shop } = useSelector((state) => state.seller)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProdcutsShop(shop._id))
    },[dispatch])

    console.log(products)

  return (
    <div>
      
    </div>
  )
}

export default AllProducts
