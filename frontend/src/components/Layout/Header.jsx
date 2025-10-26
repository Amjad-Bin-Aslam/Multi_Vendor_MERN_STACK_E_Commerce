import React, { useState } from 'react'
import styles from '../../styles/styles'
import { Link, NavLink } from 'react-router-dom'
import { categoriesData, productData } from '../../static/data'
import { AiOutlineHeart, AiOutlineProfile, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { BiMenuAltLeft } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import DropDown from './DropDown'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { backend } from '../../../server'

const Header = ({ activeHeading }) => {

  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchData, setSearchData] = useState(null)
  const [active, setActive] = useState(false)
  const [dropDown, setDropdown] = useState(false)

  console.log(user)

  const handleSearchChange = (e) => {
    const term = e.target.value
    setSearchTerm(term)
 
    const filteredProducts = productData && productData.filter((product) => {
      return product.name.toLowerCase().includes(term.toLowerCase());
    })
    setSearchData(filteredProducts)
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true)
    } else {
      setActive(false)
    }
  })

  return (
    <>
      <div className={`${styles.section}`}>

        {/* Header container */}
        <div className='flex 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between mt-4 mb-4'>
          {/* ===== logo ====== */}
          <div>
            <Link to={'/'}>
              <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="" />
            </Link>
          </div>
          {/* ===== search box ==== */}
          <div className='w-[50%] relative'>
            <input
              className='h-[40px] w-full px-2 border-[2px] rounded-md border-[#3957db]'
              type="text"
              placeholder='Search Product...'
              value={searchTerm}
              onChange={handleSearchChange} />
            <AiOutlineSearch className='absolute right-2 top-1.5 cursor-pointer' size={30} />
            {
              searchData && searchData.length !== 0
                ? <div className='w-full absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'>
                  {
                    searchData && searchData.map((item, index) => {
                      const d = item.name

                      const product_name = d.replace(/\s+/g, "_");
                      return (
                        <Link to={`/product/${product_name}`}>
                          <div className='w-full flex items-start-py-2'>
                            <img
                              src={item.image_Url[0].url} alt=""
                              className='w-[40px] h-[40px] mr-[10px]'
                            />
                            <h1> {item.name} </h1>
                          </div>
                        </Link>
                      )
                    })
                  }
                </div>
                : null
            }
          </div>

          {/* Seller icon */}
          <div className={`${styles.button}`}>
            <Link to="/seller">
              <h1 className='text-[#fff] flex items-center'>
                Become Seller
                <IoIosArrowForward />
              </h1>
            </Link>
          </div>
        </div>

      </div>

      {/* Menue Baar */}
      <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition flex 800px:flex items-center justify-between w-full bg-[#3321cb] h-[70px]`}>
        <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
          {/* Categories */}
          <div onClick={() => setDropdown(!dropDown)} >
            <div className='relative h-[60px] mt-[10px] w-[270px]  1000px:block cursor-pointer'>
              <BiMenuAltLeft size={30} className='absolute top-3 left-2' />
              <button className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}>
                All Categories
              </button>
              <IoIosArrowDown
                onClick={() => setDropdown(!dropDown)}
                size={20}
                className='absolute right-2 top-4 cursor-pointer'
              />
              {/* Dropdown data from dropdown component */}
              {
                dropDown ? (
                  <DropDown
                    categoriesData={categoriesData}
                    setDropdown={setDropdown}
                  />
                ) : null
              }
            </div>
          </div>

          {/* NavBar items */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          {/* Right side of Navbar */}
          <div className='flex'>
            {/* wishlist */}
            <div className={`${styles.noramlFlex}`}>
              <div className='relative cursor-pointer mr-[15px]'>
                <AiOutlineHeart
                  size={30}
                  color='rgb(255 255 253 / 83%)'
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                </span>
              </div>
            </div>
            {/* Shopping cart */}
            <div className={`${styles.noramlFlex}`}>
              <div className='relative cursor-pointer mr-[15px]'>
                <AiOutlineShoppingCart
                  size={30}
                  color='rgb(255 255 253 / 83%)'
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                </span>
              </div>
            </div>
            {/* profile icon*/}
            <div className={`${styles.noramlFlex}`}>
              <div className='relative cursor-pointer mr-[15px]'>
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      className='w-[35px] h-[35px] object-cover rounded-full'
                      src={`${backend}${user.avatar.url}`}
                      alt="user"
                    />

                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile
                      size={30}
                      color='rgb(255 255 255 / 83%'
                    />
                  </Link>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

    </>
  )
}

export default Header
