import React from 'react'
import DashboardHeader from '../../components/shop/layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/layout/DashboardSidebar'
import AllProducts from '../../components/Shop/AllProducts.jsx'

const ShopAllProductsPage = () => {
  return (
     <div>
          <DashboardHeader />
          <div className='flex items-center justify-between w-full'>
            <div className='w-[80px] lg:w-[330px]'>
               <DashboardSidebar active = {3} />
            </div>
            <div className='w-full justify-center flex'>
                <AllProducts />
            </div>
          </div>
     </div>
  )
}

export default ShopAllProductsPage
