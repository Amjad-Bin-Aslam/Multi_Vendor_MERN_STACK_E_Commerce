import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteShopProduct, getAllProdcutsShop } from '../../redux/actions/product'
import 'react-data-grid/lib/styles.css';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import Loader from '../Layout/Loader';
import { toast } from 'react-toastify';
import styles from '../../styles/styles';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { server } from '../../../server';


const AllCoupons = () => {

    const [isLoading, setIsloading] = useState(false)
    const [coupons, setCoupons] = useState([])
    const [open , setOpen] = useState(false)
    const [name, setName] = useState('')
    const [value, setValue] = useState(null)
    const [minAmount , setMinAmmount] = useState(null)
    const [maxAmount , setMaxAmount] = useState(null)
    const [selectedProducts, setSelectedProducts] = useState(null)

    const productState = useSelector((state) => state.product || {})
    const { products = [] } = productState
    const { shop } = useSelector((state) => state.seller || {})

    const dispatch = useDispatch()

    useEffect(() => {
      const fetchCoupons = async () => {
        if (!shop || !shop._id) return
        try {
          setIsloading(true)
          const res = await axios.get(`${server}/api/coupon/get-all-coupons/${shop._id}`, {
            withCredentials: true
          })
          // API may return { success: true, couponCodes: [...] } or an array directly
          const data = res.data && (res.data.couponCodes ?? res.data)
          setCoupons(Array.isArray(data) ? data : [])
          setIsloading(false)
          console.log(res.data)
        } catch (error) {
          setIsloading(false)
        }
      }
      fetchCoupons()
    },[dispatch, shop])

    const handleDelete = (id) => {
      // console.log(id)
      dispatch(deleteShopProduct(id))
      toast.success("product deleted successfully!")
      window.location.reload()
    }

    // console.log(products)

    const handleSubmit = async (e) => {
      e.preventDefault()
        try {
          
          const response = await axios.post(`${server}/api/coupon/create-coupon-code`, {
            name,
            value,
            minAmount,
            maxAmount,
            selectedProducts,
            shop
          }, {withCredentials: true} )
          toast.success(response.data.message)
          setName('')
          setValue(null)
          setMinAmmount(null)
          setMaxAmount(null)
          setSelectedProducts(null)
          setOpen(false)
          console.log(response.data)
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
        }
    }


    const columns = [
      {
        field:"id", 
        headerName: "Product Id",
        minWidth:150, 
        flex:0.7
      },
      {
        field:"name", 
        headerName: "Name",
        minWidth:150, 
        flex:0.7
      },
      {
        field:"price", 
        headerName: "Price",
        minWidth:150, 
        flex:0.7
      },
      {
        field: 'Delete',
        headerName:"Delete",
        minWidth: 120,
        flex: 0.8,
        type: 'number',
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Button
              onClick={()=>handleDelete(params.id)}
              >
                <AiOutlineDelete />
              </Button>
            </>
          )
        }
      }  
    ]

    const row  = [];

    (Array.isArray(coupons) ? coupons : []).forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: (item.value != null ? item.value + "%" : "0%"),
        sold: 10
      })
    })

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div className='w-full mx-8 pt-1 mt-10 bg-white'>
            <div className='w-full flex justify-end'>
              <div className={`${styles.button} !w-max h-[45px] px-3 mr-3 mb-3`}
              onClick={()=>setOpen(true)}
              >
                <span className='text-white'> Create Coupon Code </span>
              </div>
            </div>
              <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              />
              {
                open && (
                   <div className='fixed top-0 left-0 w-full h-screen bg-[#00000050] z-[20000] flex items-center justify-center'>
                      <div className='w-[90%] lg:w-[50%] h-[80vh] bg-white rounded-md shadow p-4'>
                        <div className="flex w-full justify-end">
                        <RxCross1
                        className='hover:text-[red] cursor-pointer'
                        size={30}
                        onClick={()=>setOpen(false)}
                        />
                        </div>
                        <h5 className='text-[30px] font-Poppins text-center'> Create Coupon Code </h5>
                        {/* Create coupon code Form */}
                        <form onSubmit={handleSubmit} aria-required={true}>
                            <br />
                            <div>
                                <label className='pb-2'>
                                    Name<span className='text-red-500'>*</span>
                                </label>
                                <input 
                                type="text" 
                                name='name' 
                                value={name} 
                                required
                                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                placeholder='Enter coupon code name...'
                                onChange={(e)=>setName(e.target.value)} />
                          </div>
                          <br />
                            <div>
                                <label className='pb-2'>
                                    Discount Percentage<span className='text-red-500'>*</span>
                                </label>
                                <input 
                                type="number" 
                                name='value' 
                                value={value} 
                                required
                                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                placeholder='Enter coupon code percentage value...'
                                onChange={(e)=>setValue(e.target.value)} />
                          </div>
                          <br />
                            <div>
                                <label className='pb-2'>
                                    Minimum Amount
                                </label>
                                <input 
                                type="number" 
                                name='minAmount' 
                                value={minAmount} 
                                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                placeholder='Enter coupon code min amount...'
                                onChange={(e)=>setMinAmmount(e.target.value)} />
                          </div>
                          <br />
                            <div>
                                <label className='pb-2'>
                                    Maxmimum Amount
                                </label>
                                <input 
                                type="number" 
                                name='maxAmount' 
                                value={maxAmount} 
                                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                placeholder='Enter coupon code max amount...'
                                onChange={(e)=>setMaxAmount(e.target.value)} />
                          </div>
                          <br />
                           <div>
                                <label className='pb-2'>
                                   Selected Product
                                </label>
                                    <select className='w-full mt-2 border border-gray-300 h-[35px] rounded-[5px]'
                                    value={selectedProducts}
                                    onChange={(e)=>setSelectedProducts(e.target.value)}
                                    >
                                    <option value="Choose your selected product">
                                        Choose Product
                                    </option>
                                    {
                                      products && products.map((item) => (
                                          <option value={item.name} key={item.name}>
                                            { item.name }
                                          </option>
                                       ))
                                    }
                                    </select>
                            </div>
                            <br />
                            <div>
                                
                                <input 
                                type="submit" 
                                value="Create Coupon" 
                                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer hover:bg-slate-800 hover:text-white'
                                />
                          </div>
                        </form>
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

export default AllCoupons
