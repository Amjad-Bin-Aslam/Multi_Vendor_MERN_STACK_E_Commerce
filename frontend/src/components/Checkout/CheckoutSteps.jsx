import React from 'react'
import styles from '../../styles/styles'

const CheckoutSteps = ({active}) => {
    console.log(active);
  return (
    <div className='w-full flex justify-center py-5'>
        <div className="w-[95%] lg:w-[90%] xl:w-[85%] flex items-center justify-between">
               <div className={`${styles.noramlFlex}`}>
                <div className={`${styles.cart_button}`}>
                       <span className={`${styles.cart_button_text}`}>1.Shipping</span>
                </div>
               </div>
               
               <div className={`${
                    active > 1 ? "flex-1 h-[4px] !bg-[#f63b60] mx-2 sm:mx-4"
                    : "flex-1 h-[4px] !bg-[#FDE1E6] mx-2 sm:mx-4"
                }`} />

               <div className={`${styles.noramlFlex}`}>
                <div className={`${active > 1 ? `${styles.cart_button}` : `${styles.cart_button} !bg-[#FDE1E6]`}`}>
                    <span className={`${active > 1 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
                        2.Payment
                    </span>
                </div>
               </div>

               <div className={`${
                    active > 2 ? "flex-1 h-[4px] !bg-[#f63b60] mx-2 sm:mx-4"
                    : "flex-1 h-[4px] !bg-[#FDE1E6] mx-2 sm:mx-4"
                }`} />

                <div className={`${active > 2 ? `${styles.cart_button}` : `${styles.cart_button} !bg-[#FDE1E6]`}`}>
                    <span className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
                        3.Success
                    </span>
                </div>
        </div>
    </div>
  )
}

export default CheckoutSteps