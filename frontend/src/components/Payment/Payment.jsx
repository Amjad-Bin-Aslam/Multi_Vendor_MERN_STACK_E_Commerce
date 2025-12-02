import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';

const Payment = () => {
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[70%] block md:flex">
        <div className="w-full md:w-[65%]">
          <PaymentInfo />
        </div>
        <div className="w-full md:w-[35%] md:mt-0 mt-8">
          <CartData />
        </div>
      </div>
    </div>
  )
}




const PaymentInfo = () => {

  const [select, setSelect] = useState(1);
  const navigate = useNavigate();

  const paymentHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div className='w-full md:w-[95%] bg-[#fff] rounded-md p-5 pb-8'>
      {/* Select buttons */}
      <div>
        <div className='flex w-full pb-5 border-b mb-2'>
          <div className='w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-between'
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className='w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full' />
            ) : null}
          </div>
          <h4 className='text-[18px] pl-2 font-[600] text-[#000000b1]'>
            Pay with Debit/Credit Card
          </h4>
        </div>

        {/* Pay with card */}
        {select === 1 ? (
          <div className='w-full flex border-b'>
            <form className='w-full' onSubmit={paymentHandler}>
              <div className='w-full flex pb-3'>
                <div className='w-[50%]'>
                  <label className='block pb-2'> Card Number </label>
                  <input type="number" required className={`${styles.input} !w-[95%]`} />
                </div>
                <div className='w-[50%]'>
                  <label className='block pb-2'> Billing Address </label>
                  <input type="number" required className={`${styles.input} !w-[95%]`} />
                </div>
              </div>
              <input
                type="submit"
                value="submit"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}

        <br />
        {/* paypal payment */}
        <div>
          <div className='flex w-full pb-5 border-b mb-2'>
            <div className='w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-between'
              onClick={() => setSelect(2)}
            >
              {select === 2 ? (
                <div className='w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full' />
              ) : null}
            </div>
            <h4 className='text-[18px] pl-2 font-[600] text-[#000000b1]'> Pay with PayPal </h4>
          </div>

          {/* pay with PayPal */}
          {select === 2 ? (
            <div className='w-full flex border-b'>
              <form className='w-full' onSubmit={paymentHandler}>
                <div className='w-full flex pb-3'>
                  <div className='w-full'>
                    <label className='block pb-2'> Paypal Email </label>
                    <input required className={`${styles.input} !w-[95%]`} />
                  </div>
                </div>
                <input
                  type="submit"
                  value="submit"
                  className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                />
              </form>
            </div>
          ) : null}
        </div>

        <br />
        {/* cash on delivery */}
        <div>
          <div className='flex w-full pb-5 border-b mb-5'>
            <div className='w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-between'
              onClick={() => setSelect(3)}
            >
              {select === 3 ? (
                <div className='w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full' />
              ) : null}
            </div>
            <h4 className='text-[18px] pl-2 font-[600] text-[#000000b1]'>
              Cash on Delivery
            </h4>
          </div>

          {/* Cash on delivery */}
          {select === 3 ? (
            <div className='w-full flex'>
              <form className='w-full' onSubmit={paymentHandler}>
                <input type="submit" value='Confirm'
                  className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                />
              </form>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  )

}




const CartData = () => {
  // const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[19px] font-[600]">$120</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">$10</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">-</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        $130
      </h5>
      <br />
    </div>
  );
};




export default Payment