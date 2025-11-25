import React from 'react'
import { backend, server } from '../../../server'
import styles from '../../styles/styles'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import Loader from '../Layout/Loader'


const ShopInfo = ({ isOwner }) => {

    const [data,setData] = useState({})
    const [isLoading, setIsloading] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        setIsloading(true)
        axios.get(`${server}/api/seller/get-shop-info/${id}`).then((res) => {
            setData(res.data.shopInfo)
            setIsloading(false)
        }).catch((err)=>{
            console.log(err)
            setIsloading(false)
        })
    },[])


    const logoutHandler = async () => {
        try {

            const response =   await axios.post(`${server}/api/seller/logout-shop`,{}, {
                withCredentials: true
            }) 

            toast.success(response.data.message)
            window.location.reload()
            // navigate('/shop-login')

        } catch (error) {
            toast.error(error.message)
        }
    }


    console.log(data)

    return (
        <>
        {
            isLoading ? ( 
                <Loader />
            ) : (
                <div>
            <div className='w-full py-5'>
                <div className='w-full flex items-center justify-center'>
                    <img
                        src={`${backend}/uploads/${data?.avatar}`}
                        className='w-[150px] h-[150px] rounded-full border'
                        alt="" />
                </div>
                <h3 className="text-center py-2 text-[20px] font-[600]">
                    {data?.name || '—'}
                </h3>
                <p className='text-[16px] text-[#000000a6] p-[10px] flex items-center'>
                    {data?.description || 'No description provided.'}
                </p>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Address</h5>
                <h4 className='text-[#000000a6]'>{data?.address || '—'}</h4>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Phone Number</h5>
                <h4 className='text-[#000000a6]'>{data?.phoneNumber || '—'}</h4>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Total Products</h5>
                <h4 className='text-[#000000a6]'>10</h4>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Shop Ratings</h5>
                <h4 className='text-[#000000a6]'>4/5</h4>
            </div>
            <div className='p-3'>
                <h5 className='font-[600]'>Joined On</h5>
                <h4 className='text-[#000000a6]'>{data?.createdAt ? data.createdAt.slice(0, 10) : '—'}</h4>
            </div>
            {
                isOwner && (
                    <div className='py-3 px-4'>
                        <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                            <span className='text-white'>Edit Shop</span>
                        </div>
                        <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                            onClick={logoutHandler}
                        >
                            <span className='text-white'>Log Out</span>
                        </div>
                    </div>
                )
            }
        </div>
            )
        }
        </>
    )
}

export default ShopInfo
