import React, { useState } from 'react'
import styles from '../../styles/styles'
import { Link, NavLink } from 'react-router-dom'
import { productData } from '../../static/data'

const Header = () => {

    const [searchTerm , setSearchTerm] = useState("")
    const [searchData , setSearchData] = useState(null)

    const handleSearchChange = (e) => {
        const term = e.target.value
        setSearchTerm(term)
 
        const filteredProducts = productData && productData.filter((product) => {
            product.name.toLocaleLowerCase.includes(term.toLocaleLowerCase());
        })
    }
 
  return (
    <div className={`${styles.section}`}>

        {/* Header container */}
      <div className='800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between'>
        {/* ===== logo ====== */}
            <div>
                <Link to={'/'}>
                    <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="" />
                </Link>
            </div>
        {/* ===== search box ==== */}
        <div className='w-[50%] relative'>
            <input type="text" placeholder='Search Product...' />
        </div>
      </div>

    </div>
  )
}

export default Header
