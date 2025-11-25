import React from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { backend } from '../../../../server'

const DashboardHeader = () => {

   const { shop } = useSelector((state) => state.seller)

  return (
      <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
        <div>
            <Link to='/dashboard'>
                <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="" />
            </Link>
        </div>
        <div className='flex items-center'>
            <div className='flex items-center mr-4'>
                <Link to={'/dashboard/coupons'} className='lg:block hidden'>
                    <AiOutlineGift
                    color='#555'
                    size={30}
                    className='cursor-pointer mx-5'
                    />
                </Link>
                <Link to={'/dashboard-events'} className='lg:block hidden'>
                    <MdOutlineLocalOffer
                    color='#555'
                    size={30}
                    className='cursor-pointer mx-5'
                    />
                </Link>
                 <Link to={'/dashboard-products'} className='lg:block hidden'>
                    <FiShoppingBag
                    color='#555'
                    size={30}
                    className='cursor-pointer mx-5' 
                    />
                </Link>
                <Link to={'/dashboard-orders'} className='lg:block hidden'>
                    <FiPackage
                    color='#555'
                    size={30}
                    className='cursor-pointer mx-5' 
                    />
                </Link>
                <Link to={'/dashboard-message'} className='lg:block hidden'>
                    <BiMessageSquareDetail
                    color='#555'
                    size={30}
                    className='cursor-pointer mx-5' 
                    />
                </Link>
                <Link to={`/shop/${shop._id}`}>
                    <img 
                    src={`${backend}/uploads/${shop.avatar}`} 
                    alt=""
                    className='w-[50px] h-[50px] rounded-full object-cover cursor-pointer border-2 border-gray-500 mx-5'
                    />
                </Link>
            </div>
        </div>
      </div>
  )
}

export default DashboardHeader
