import React from 'react'
import styles from '../../styles/styles'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { City, Country, State } from 'country-state-city'

const Checkout = () => {

    const { user } = useSelector((state) => state.user || {})
    const { cart } = useSelector((state) => state.cart || {})

    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [userInfo, setUserInfo] = useState(false)
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [zipCode, setZipCode] = useState(null)
    const [couponCode, setCouponCode] = useState("")
    const [couponCodeData, setCouponCodeData] = useState(null)

    const navigate = useNavigate()

    const paymentSubmit = () => {
        navigate('/payment')
    };


    const subTotalPrice = cart && cart.reduce((acc, item) => acc + item.discountPrice * item.qty, 0)
    const shipping = subTotalPrice * 0.1;
    
    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    const discountPercentage = couponCodeData ? (subTotalPrice * couponCodeData.value) / 100 : "";

    const totalPrice = couponCodeData ? (subTotalPrice + shipping - discountPercentage).toFixed(2) : (subTotalPrice + shipping).toFixed(2);

    return (
        <div className='w-ful flex flex-col items-center py-8'>
            <div className='w-[90%] lg:w-[70%] block md:flex'>
                <div className='w-full md:w-[65%] lg:w-[70%]'>
                    <ShippingInfo
                        user={user}
                        country={country}
                        setCountry={setCountry}
                        city={city}
                        setCity={setCity}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        address1={address1}
                        setAddress1={setAddress1}
                        address2={address2}
                        setAddress2={setAddress2}
                        zipCode={zipCode}
                        setZipCode={setZipCode}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        couponCodeData={couponCodeData}
                        setCouponCodeData={setCouponCodeData}
                    />
                </div>
                <div className='w-full md:w-[35%] md:mt-0 mt-8'>
                    <CartData  
                    handleSubmit={handleSubmit}
                    totalPrice={totalPrice}
                    shipping={shipping}
                    subTotalPrice={subTotalPrice}
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                    discountPercentage={discountPercentage}
                    />
                </div>
            </div>
            <div className={`${styles.button} w-[150px] md:w-[200px] mt-10`}
                onClick={paymentSubmit}
            >
                <h5 className='text-white'> 
                    Proceed to Payment
                </h5>
            </div>
        </div>
    )
}



const ShippingInfo = ({
    user,
    country,
    setCountry,
    city,
    setCity,
    userInfo,
    setUserInfo,
    address1,
    setAddress1,
    address2,
    setAddress2,
    zipCode,
    setZipCode,
    couponCode,
    setCouponCode,
    couponCodeData,
    setCouponCodeData
}) => {

    const [stateCode, setStateCode] = useState("")
    return (
        <div className='w-full md:w-[95%] bg-white rounded-md p-5 pb-8'>
            <h3 className='text-[18px] font-[500] pb-3'>Shipping Information</h3>
            <br />
            <form>

                <div className='w-full flex pb-3'>
                    <div className='w-[50%]'>
                        <label className='block pb-2'>Full Name</label>
                        <input
                            type="text"
                            required
                            value={user && user.name}
                            className={`${styles.input} !w-[90%]`}
                        />
                    </div>
                    <div className='w-[50%]'>
                        <label className='block pb-2'>Email Address</label>
                        <input
                            type="email"
                            required
                            value={user && user.email}
                            className={`${styles.input} !w-[90%]`}
                        />
                    </div>
                </div>

                <div className='w-full flex pb-3'>
                    <div className='w-[50%]'>
                        <label className='block pb-2'>Phone Number</label>
                        <input
                            type="number"
                            required
                            value={user && user.phoneNumber}
                            className={`${styles.input} !w-[90%]`}
                        />
                    </div>
                    <div className='w-[50%]'>
                        <label className='block pb-2'>Zip Code</label>
                        <input
                            type="number"
                            required
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className={`${styles.input} !w-[90%]`}
                        />
                    </div>
                </div>


                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className="block pb-2">Country</label>
                        <select
                            className="w-[90%] border h-[40px] rounded-[5px]"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option className="block pb-2" value="">
                                Choose your country
                            </option>
                            {Country &&
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-2">City</label>
                        <select
                            className="w-[90%] border h-[40px] rounded-[5px]"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option className="block pb-2" value="">
                                Choose your City
                            </option>
                            {State &&
                                State.getStatesOfCountry(country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className='w-full flex pb-3'>
                    <div className='w-[50%]'>
                        <label className='block pb-2'>Address 1</label>
                        <input
                            type="address"
                            required
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            className={`${styles.input} !w-[90%]`}
                        />
                    </div>
                    <div className='w-[50%]'>
                        <label className='block pb-2'>Address 2</label>
                        <input
                            type="address"
                            required
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                            className={`${styles.input} !w-[90%]`}
                        />
                    </div>
                </div>


            </form>
            <h5 className='text-[18px] cursor-pointer inline-block'
                onClick={() => setUserInfo(!userInfo)}
            >
                Choose from saved address
            </h5>
            {
                userInfo && (
                    <div>
                        {
                            user && user.addresses.map((item, index) => (
                                <div key={index} className='w-full flex mt-1'>
                                    <input
                                        className='mr-3'
                                        type="checkbox"
                                        value={item.addressType}
                                        onClick={() =>
                                            setAddress1(item.address1) ||
                                            setAddress2(item.address2) ||
                                            setCity(item.state) ||
                                            setZipCode(item.zipCode) ||
                                            setCountry(item.country)
                                        }
                                    />
                                    <h2>
                                        {item.addressType}
                                    </h2>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}



const CartData = ({
    handleSubmit,
    totalPrice,
    shipping,
    subTotalPrice,
    discountPercentage,
    couponCode,
    setCouponCode,
}) => {

    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
                <h5 className="text-[18px] font-[600]"> ${subTotalPrice} </h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
                <h5 className="text-[18px] font-[600]"> ${shipping} </h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                <h5 className="text-[18px] font-[600]">
                   - { discountPercentage ? "$" + discountPercentage.toString() : null }
                </h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">
                ${totalPrice}
            </h5>
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={`${styles.input} h-[40px] pl-2`}
                    placeholder="Coupoun code"
                    required
                />
                <input
                    className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
                    required
                    value="Apply code"
                    type="submit"
                />
            </form>
        </div>
    )
}



export default Checkout