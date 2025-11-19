import React from 'react'
import Lottie from 'lottie-react'
import loaderAnimation from '../../assets/animations/Material loading.json'

const Loader = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Lottie animationData={loaderAnimation} loop={true} style={{ width: 300, height: 300 }} />
    </div>
  )
} 
 
export default Loader
