import React, { use, useState } from 'react'
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
import Cart from '../cart/Cart'
import WishList from "../WishList/WishList"
import { RxCross1 } from 'react-icons/rx'

const Header = ({ activeHeading }) => {

  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { allProducts } = useSelector((state) => state.product || {})

  const [searchTerm, setSearchTerm] = useState("")
  const [searchData, setSearchData] = useState(null)
  const [active, setActive] = useState(false)
  const [dropDown, setDropdown] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [openWishList, setOpenWishList] = useState(false)
  const [open, setOpen] = useState(false)

  // console.log(user) 

  const handleSearchChange = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    const filteredProducts = allProducts && allProducts.filter((product) => {
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
        <div className='hidden lg:h-[50px] lg:my-[20px] lg:flex items-center justify-between mt-4 mb-4'>
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

                      const product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${product_name}`}>
                          <div className='w-full flex items-start-py-2'>
                            <img
                              src={`${backend}${item.images[0]}`} alt=""
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
            <Link to="/shop-create">
              <h1 className='text-[#fff] flex items-center'>
                Become Seller
                <IoIosArrowForward />
              </h1>
            </Link>
          </div>
        </div>

      </div>

      {/* Menue Baar */}
      <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden lg:flex items-center justify-between w-full bg-[#3321cb] h-[70px]`}>
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
              <div className='relative cursor-pointer mr-[15px]'
                onClick={() => setOpenWishList(true)}
              >
                <AiOutlineHeart
                  size={30}
                  color='rgb(255 255 253 / 83%)'
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                </span>
              </div>
            </div>
            {/* Shopping cart icon */}
            <div className={`${styles.noramlFlex}`}>
              <div className='relative cursor-pointer mr-[15px]'
                onClick={() => setOpenCart(true)}
              >
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
                  <Link to={"/profile"}>
                    <img
                      className='w-[35px] h-[35px] object-cover rounded-full'
                      src={user && user.avatar ? `${backend}${user.avatar}` : 'https://via.placeholder.com/35'}
                      alt=""
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

            {/* Cart popup */}

            {
              openCart ? (
                <Cart setOpenCart={setOpenCart} />
              ) : null
            }

            {/* Wishlist poprup */}

            {
              openWishList ? (
                <WishList setOpenWishList={setOpenWishList} />
              ) : null
            }

          </div>

        </div>
      </div>


      {/* Mobile Screen Header */}
      <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10 " : null} w-full h-[70px] bg-[#fff] z-50 top-0 left-0 shadow-sm lg:hidden`}>
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className='ml-4 cursor-pointer'
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              className='mt-3 cursor-pointer'
              alt="" />
          </div>
          <div>
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart
                size={30}
              />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">1
              </span>
            </div>
          </div>
        </div>

        {/* Header side bar */}

        {
          open && (
            <div className='fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0'>
              <div className='fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 p-4'>

                {/* Cart and cross icons */}
                <div className='w-full flex justify-between pr-3'>
                  <div>
                    <div className='relative mr-[15px]'>
                      <AiOutlineHeart
                        size={30}
                        className='mt-5 ml-3'
                      />
                      <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">1
                      </span>
                    </div>
                  </div>
                  <RxCross1 size={30}
                    className='ml-4 mt-5 cursor-pointer hover:text-[#3957db]'
                    onClick={() => setOpen(false)}
                  />

                </div>

                {/* search items */}
                <div className='my-8 w-[92%] m-auto h-[40px] relative'>
                  <input
                    type="search"
                    className='h-[40px] w-full px-2 border-[2px] rounded-md border-[#3957db]'
                    placeholder='Search Product...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {
                    searchData && searchData.length !== 0
                      ? <div className='w-full absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'>
                        {
                          searchData && searchData.map((item, index) => {
                            const d = item.name

                            const product_name = d.replace(/\s+/g, "-");
                            return (
                              <Link to={`/product/${product_name}`}>
                                <div className='w-full flex items-start-py-2'>
                                  <img
                                    src={`${backend}${item.images[0]}`} alt=""
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

                <Navbar active={activeHeading} />

                {/* Seller Button */}
                <div className={`${styles.button} ml-5 mt-8`}>
                  <Link to="/shop-create"> 
                    <h1 className='text-[#fff] flex items-center'>
                      Become Seller
                      <IoIosArrowForward />
                    </h1>
                  </Link>
                </div>

                <br />
                <br />
                <br />

                {/* User profile image and login and signup */}
                <div className='flex w-full justify-center '>
                  {
                    isAuthenticated ? (
                      <div>
                        <Link to={"/profile"}>
                          <img
                            className='w-[45px] h-[45px] object-cover rounded-full border-[3px] border-[#44db39]'
                            src={user && user.avatar ? `${backend}${user.avatar}` : 'https://via.placeholder.com/45'}
                            alt=""
                          />
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Link to="/login" className='text-[18px] pr-[10px] text-[#000000b7] hover:text-[#3957db]'>
                          Login /
                        </Link>
                        <Link to="/sign-up" className='text-[18px] pr-[10px] text-[#000000b7] hover:text-[#3957db]'>
                          Sign Up
                        </Link>
                      </>
                    )
                  }



                </div>

              </div>
            </div>
          )
        }

      </div>

    </>
  )
}

export default Header
