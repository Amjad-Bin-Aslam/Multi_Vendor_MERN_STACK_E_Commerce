import React from 'react'
import DashboardHeader from '../../components/shop/layout/DashboardHeader'
import DashboardSidebar from '../../components/shop/layout/DashboardSidebar'
import AllEvent from '../../components/Shop/AllEvent.jsx'

const ShopAllEventsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className='flex justify-between w-full'>
            <div className='w-[80px] lg:w-[330px]'>
               <DashboardSidebar active = {5} />
            </div>
            <div className='w-full justify-center flex'>
                <AllEvent />
            </div>
       </div>
    </div>
  )
}

export default ShopAllEventsPage
