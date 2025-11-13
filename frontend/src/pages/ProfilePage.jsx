import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import styles from '../styles/styles'
import ProfileSideBar from '../components/Profile/ProfileSideBar'
import ProfileContent from '../components/Profile/ProfileContent'

const ProfilePage = () => {

  const [active , setActive] = useState(1)

  return (
    <div>
      <Header />
      <div className={`${styles.section} flex flex-col md:flex-row gap-4 md:gap-6 bg-[#f5f5f5] py-8 md:py-10 px-4 md:px-0`}>
        <div className='w-full md:w-[335px]'>
            <ProfileSideBar active={active} setActive={setActive}  />
        </div> 
        <div className='w-full md:flex-1'>
          <ProfileContent active ={active} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
