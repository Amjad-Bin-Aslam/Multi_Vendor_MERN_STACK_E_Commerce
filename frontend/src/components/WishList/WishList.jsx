import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { IoBagHandleOutline } from 'react-icons/io5'
import { BsCartPlus } from "react-icons/bs"
import styles from '../../styles/styles'
import { AiOutlineHeart } from 'react-icons/ai'

const WishList = ({ setOpenWishList }) => {

    const CartData = [
        {
            name: "Iphone 14 pro max 256 gb ssd and 8gb ram silver color",
            description: "it is latest model",
            price: 999
        },
        {
            name: "Iphone 14 pro max 256 gb ssd and 8gb ram silver color",
            description: "it is latest model",
            price: 599
        },
        {
            name: "Iphone 14 pro max 256 gb ssd and 8gb ram silver color",
            description: "it is latest model",
            price: 445
        },
    ]

    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex-col justify-between shadow-sm'>
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
                            3 items
                        </h5>
                    </div>
                    {/* Cart single item */}
                    <br />
                    <div className='w-full border-t'>
                        {
                            CartData && CartData.map((item,index) => (
                                <CartSingle key = {index} data={item} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


const CartSingle = ({data}) => {
    const [value , setValue] = useState(1)
    const totalPrice = data.price * value

    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <RxCross1 className='cursor-pointer' />
                    <img className='w-[80px] h-[80px] ml-2' src="https://regen.pk/cdn/shop/products/REGEN-iPhone14ProMax-Frontback-DeepPurple-Pakistan_1.png?v=1681907325" alt="" />
            
                <div className='pl-[5px]'>
                    <h1> {data.name} </h1>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222]'> 
                        USD${totalPrice} 
                    </h4>
                </div>
                <div>
                    <BsCartPlus size = {20} className = 'cursor-pointer' title= "Add to cart" />
                </div>
            </div>
        </div>
    )
}

export default WishList

