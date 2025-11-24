import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { IoBagHandleOutline } from 'react-icons/io5'
import { BsCartPlus } from "react-icons/bs"
import styles from '../../styles/styles'
import { AiOutlineHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromWishlist } from '../../redux/actions/wishlist'
import { backend } from '../../../server'
import { addToCart } from '../../redux/actions/cart'

const WishList = ({ setOpenWishList }) => {

    const { wishlist } = useSelector((state) => state.wishlist || {})

    const dispatch = useDispatch()

    const removeFromWishlistHandler = (data) => {
        dispatch(removeFromWishlist(data))
    }

    const addToCartHandler = (data) => {
        const newdData = { ...data, qty: 1 };
       dispatch(addToCart(newdData))
       setOpenWishList(false)
    }

    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex-col justify-between shadow-sm'>
                {
                    wishlist && wishlist.length === 0 ? (
                        <div className='w-full h-screen flex items-center justify-center'>
                            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                                <RxCross1
                                    size={25}
                                    className='cursor-pointer hover:text-[red]'
                                    onClick={() => setOpenWishList(false)}
                                />
                            </div>
                            <h5 className='text-[18px] font-semibold text-gray-600'>
                                Wishlist is Empty!
                            </h5>
                        </div>
                    ) : (
                        <>
                            <div>
                                <div className='flex w-full justify-end pt-5 pr-5'>
                                    <RxCross1
                                        size={25}
                                        className='cursor-pointer hover:cursor-pointer hover:text-red-500'
                                        onClick={() => setOpenWishList(false)}
                                    />
                                </div>
                                {/* item length */}
                                <div className={`${styles.noramlFlex} p-4`}>
                                    <AiOutlineHeart
                                        size={25}
                                    />
                                    <h5 className='pl-2 text-[20px] font-[500]'>
                                        {wishlist ? wishlist.length : 0} Items
                                    </h5>
                                </div>
                                {/* Cart single item */}
                                <br />
                                <div className='w-full border-t'>
                                    {
                                        wishlist && wishlist.map((item, index) => (
                                            <CartSingle key={index} 
                                            removeFromWishlistHandler={removeFromWishlistHandler}
                                            data={item} 
                                            addToCartHandler={addToCartHandler}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}


const CartSingle = ({ data,removeFromWishlistHandler,addToCartHandler }) => {
    const [value, setValue] = useState(1)
    const totalPrice = data.discountPrice * value

    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <RxCross1 className='cursor-pointer hover:text-[red]' size={20}
                onClick={() => removeFromWishlistHandler(data)}
                />
                <img 
                className='w-[80px] h-[80px] ml-2' 
                src={`${backend}${data?.images[0]}`} alt="" />

                <div className='pl-[5px]'>
                    <h1> {data.name} </h1>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222]'>
                        USD${totalPrice}
                    </h4>
                </div>
                <div>
                    <BsCartPlus size={20} className='cursor-pointer' title="Add to cart" 
                    onClick={() => addToCartHandler(data)}
                    />
                </div>
            </div>
        </div>
    )
}

export default WishList

