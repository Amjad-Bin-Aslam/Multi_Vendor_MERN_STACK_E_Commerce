import React, { useEffect } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/Route/ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import Loader from '../components/Layout/Loader'

const ProductPage = () => {

    const { allProducts, isLoading } = useSelector((state) => state.product)

    // const { user } = useSelector((state) => state.user)

    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get('category')
    const [data, setData] = useState([])

    useEffect(() => {
        const source = Array.isArray(allProducts) ? allProducts : []
        if (categoryData === null) {
            const d = [...source].sort((a, b) => (a?.sold_out || 0) - (b?.sold_out || 0))
            setData(d)
        } else {
            const d = source.filter((item) => item.category === categoryData)
            setData(d)
        }
    },[allProducts, categoryData])

    console.log(allProducts)
    // console.log(user)

    return (
    <>
        {
            isLoading ? (
                <Loader />
            ) : (
                <div>
            <Header activeHeading={3} />
            <br />
            <br />

            <div className={`${styles.section}`}>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {
                        data && data.map((item, index) => <ProductCard data={item} key={index} />)
                    }
                </div>
                {
                    data && data.length === 0 ? (
                        <h1 className='text-center w-full pb-[110px] text-[20px]'>  No products found! </h1>
                    ) : null
                }
            </div>

        </div>
            )
        }
    </>   
    )
}

export default ProductPage
