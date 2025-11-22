import React, { useEffect, useState } from 'react'
import { productData } from '../../../static/data';
import styles from '../../../styles/styles';
import ProductCard from "../ProductCard/ProductCard"
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/actions/product';


const BestDeals = () => {

  const dispatch = useDispatch()
  const { allProducts } = useSelector((state) => state.product || {})
  
     const [data , setData] = useState([]);

    //  useEffect(() => {
    //   dispatch(getAllProducts())
    //  },[dispatch])

     useEffect(()=>{ 
        if (Array.isArray(allProducts) && allProducts.length > 0) {
          const firstFive = allProducts.slice(0, 5)
          setData(firstFive)
        } else {
          setData([])
        }
     },[allProducts])

     console.log(data) 
    //  console.log(allProducts)

  return (
    <div>
      
      <div className={`${styles.section}`} >
        <div className={`${styles.section} ml-0`}>
            <h1 className='font-bold text-4xl mb-10'> Best Deals </h1>
        </div>

        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
            {
                data && data.map((item,index)=>(
                    <ProductCard data={item} key = {index} />
                ))
            }
        </div>

      </div>

    </div>
  )
}

export default BestDeals
