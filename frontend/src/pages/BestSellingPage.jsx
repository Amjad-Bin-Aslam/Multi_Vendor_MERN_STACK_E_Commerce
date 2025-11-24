import React, { useEffect, useState } from 'react'
import { productData } from '../static/data'
import Header from '../components/Layout/Header'
import ProductCard from '../components/Route/ProductCard/ProductCard'
import styles from '../styles/styles'
import { useSelector } from 'react-redux'

const BestSellingPage = () => {

    const { allProducts } = useSelector((state) => state.product || {})

    const [data , setData] = useState([])

    useEffect(()=> { 
        const source = Array.isArray(allProducts) ? allProducts : []
        const d = [...source].sort((a,b) => b.total_sell - a.total_sell)
        setData(d)

    },[])
 
  return (
    <div>
            <Header activeHeading={2} />
            <br />
            <br />

            <div className={`${styles.section}`}>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {
                        data && data.map((item, index) => <ProductCard data={item} key={index} />)
                    }
                </div>
            </div>

        </div> 
  )
}

export default BestSellingPage
