import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import styles from '../../styles/styles'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../../server'
import { toast } from 'react-toastify'

const ShopCreate = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        setAvatar(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const newForm = new FormData();

        newForm.append("name", name)
        newForm.append('email', email)
        newForm.append('phoneNumber', phoneNumber)
        newForm.append('address', address)
        newForm.append('zipCode', zipCode)
        newForm.append('password', password)
        newForm.append('file', avatar)

        try {

            const response = await axios.post(`${server}/api/seller/create-shop`, newForm, config)

            toast.success(response.data.message)
            setName("")
            setEmail("")
            setPhoneNumber("")
            setAddress("")
            setZipCode("")
            setPassword("")
            setAvatar(null)
            // navigate("/shop-login")
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }



    }

return (
<div className='min-h-screen bg-gray-50 flex items-center py-12 px-4 sm:px-6 lg:px-8'>

    <div className='w-full max-w-5xl mx-auto'>
        <div className='text-center mb-8'>
            <h2 className='text-3xl font-extrabold text-gray-900'>Register as a seller</h2>
            <p className='mt-2 text-sm text-gray-600'>Create your shop and start selling to millions of customers.</p>
        </div>

        <div className='bg-white shadow rounded-lg overflow-hidden lg:flex lg:items-stretch'>
            {/* Left: form (full width on small, 2/3 on large) */}
            <div className='w-full lg:w-2/3 p-6 sm:p-8'>
                <form onSubmit={handleSubmit} className='space-y-6'>

                    {/* Shop Name */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700' htmlFor="name">Shop Name</label>
                        <div className='mt-1'>
                            <input
                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                type="text"
                                name='name'
                                autoComplete='name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>


                    {/* Email & Address grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700' htmlFor="email">Email</label>
                            <div className='mt-1'>
                                <input
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                    type="text"
                                    name='email'
                                    autoComplete='email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700' htmlFor="address">Address</label>
                            <div className='mt-1'>
                                <input
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                    type="text"
                                    name='address'
                                    autoComplete='address'
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>
                    </div>


                    {/* Phone Number & Zip grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700' htmlFor="phoneNumber">Shop Phone Number</label>
                            <div className='mt-1'>
                                <input
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                    type="number"
                                    name='phoneNumber'
                                    inputMode='numeric'
                                    autoComplete='phoneNumber'
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)} /> 
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700' htmlFor="zipCode">Zip Code</label>
                            <div className='mt-1'>
                                <input
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                    type="number"
                                    name='zipCode'
                                    autoComplete='zipCode'
                                    required
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)} />
                            </div>
                        </div>
                    </div>


                    {/* Password */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700' htmlFor="password">Password</label>
                        <div className='mt-1 relative'>
                            <input
                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                type={visible ? "text" : "password"}
                                name='password'
                                autoComplete='current-password'
                                required
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            {
                                visible ? (
                                    <AiOutlineEye
                                        className='absolute right-3 top-2.5 cursor-pointer text-gray-500'
                                        size={22}
                                        onClick={() => setVisible(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className='absolute right-3 top-2.5 cursor-pointer text-gray-500'
                                        size={22}
                                        onClick={() => setVisible(true)}
                                    />
                                )
                            }
                        </div>
                    </div>


                    {/* Avatar */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700' htmlFor="avatar">Shop Logo (optional)</label>
                        <div className='mt-2 flex items-center'>
                            <span className='h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center'>
                                {
                                    avatar
                                        ? <img className='h-full w-full object-cover rounded-full' src={URL.createObjectURL(avatar)} alt="avatar" />
                                        : (
                                            <RxAvatar className="w-6 h-6 text-gray-400" />
                                        )
                                }
                            </span>
                            <label className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer" htmlFor="file-input">
                                <span>Upload logo</span>
                                <input
                                    className='sr-only'
                                    type="file" 
                                    name='avatar' 
                                    id='file-input' 
                                    accept='.jpg,.jpeg,.png'
                                    onChange={handleFileInputChange}
                                />
                            </label>
                        </div>
                    </div>

                    <div>
                        <button className='group relative w-full h-[44px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer' type='submit'>
                            Create Shop
                        </button> 
                    </div>

                    <div className={`${styles.noramlFlex} w-full text-sm`}>
                        <h4 className='text-gray-600'>Already have an account?</h4>
                        <Link to="/shop-login" className="text-blue-600 pl-2" >
                            Sign in
                        </Link>
                    </div>

                </form>
            </div>

            {/* Right side */}
            <div className='hidden lg:block w-1/3 bg-gradient-to-b from-blue-50 to-white p-6 sm:p-8'>
                <div className='h-full flex flex-col justify-center'>
                    <img src='https://shopo.quomodothemes.website/assets/images/logo.svg' alt='shop' className='w-full h-40 object-contain mb-6' />
                    <h3 className='text-lg font-semibold text-gray-900 mb-2'>Why sell with us?</h3>
                    <ul className='text-sm text-gray-600 space-y-2'>
                        <li>• Reach millions of customers</li>
                        <li>• Low commission fees</li>
                        <li>• Easy-to-use seller dashboard</li>
                    </ul>
                    <p className='mt-4 text-xs text-gray-500'>By creating a shop you agree to our terms and policies.</p>
                </div>
            </div>

        </div>
    </div>

</div>
)
}

export default ShopCreate
