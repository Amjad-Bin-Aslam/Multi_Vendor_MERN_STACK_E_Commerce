import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/styles'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const ProductDetails = ({ data }) => {

    const [count, setCount] = useState(1)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(0)
    const navigate = useNavigate()

    const incrementCount = () => {
        setCount(count + 1)
    }

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const handleMesssageSubmit = () => {
        navigate("/abvhgf$hajkghj+jkdfg=50jhd")
    }

    // console.log(data)

    return (
        <div className='bg-white'>
            {
                data ? (
                    <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                        <div className="w-full py-5">
                            <div className='block w-full 800px:flex'>
                                {/* Left side */}
                                <div className='w-full 800px:w-[90%]'>
                                    <img src={data.image_Url[select].url} alt="" className='w-[40%]' />
                                    <div className='w-full flex'>
                                        <div className={`${select === 0 ? 'border' : 'null'} cursor-pointer`}>
                                            <img src={data?.image_Url[0].url} alt=""
                                                className='h-[200px]'
                                                onClick={() => setSelect(0)}
                                            />
                                        </div>
                                        <div className={`${select === 1 ? 'border' : 'null'} cursor-pointer`}>
                                            <img src={data?.image_Url[1].url} alt=""
                                                className='h-[200px]'
                                                onClick={() => setSelect(1)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Right side */}
                                <div className='w-full 800px:w-[50%] pt-5'>
                                    <h1 className={`${styles.productTitle}`}>
                                        {data.name}
                                    </h1>
                                    <p>
                                        {data.description}
                                    </p>
                                    <div className='flex pt-3'>
                                        <h4 className={`${styles.productDiscountPrice}`}>
                                            {data.discount_price}$
                                        </h4>
                                        <h3 className={`${styles.price}`}>
                                            {data.price ? data.price + "$" : null}
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between mt-10 mb-6">
                                        {/* Quantity Counter */}
                                        <div className="flex items-center">
                                            <button
                                                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l-md px-4 py-2 hover:opacity-80 transition cursor-pointer"
                                                onClick={decrementCount}
                                            >
                                                -
                                            </button>
                                            <span className="bg-gray-100 text-gray-800 font-medium px-5 py-2 border">
                                                {count}
                                            </span>
                                            <button
                                                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r-md px-4 py-2 hover:opacity-80 transition cursor-pointer"
                                                onClick={incrementCount}
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Wishlist */}
                                        <div>
                                            {click ? (
                                                <AiFillHeart
                                                    size={30}
                                                    className="cursor-pointer"
                                                    color="red"
                                                    onClick={() => setClick(false)}
                                                    title="Remove from wishlist"
                                                />
                                            ) : (
                                                <AiOutlineHeart
                                                    size={30}
                                                    className="cursor-pointer"
                                                    color="#333"
                                                    onClick={() => setClick(true)}
                                                    title="Add to wishlist"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className={`${styles.button} mt-6 h-11 flex rounded items-center`}>
                                        <span className='text-white flex items-center'>
                                            Add to Cart <AiOutlineShoppingCart className='ml-1' />
                                        </span>
                                    </div>
                                    <div className='flex items-center pt-8'>
                                        <img src={data.shop.shop_avatar.url} alt=""
                                            className='w-[50px] h-[50px] rounded-full mr-2'
                                        />
                                        <div className='pr-8'>
                                            <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                                {data.shop.name}
                                            </h3>
                                            <h5 className='pb-3 text-[15px]'>
                                                {(data.shop.ratings)} Ratings
                                            </h5>
                                        </div>
                                        <div className={`w-[150px] my-3 flex items-center justify-center rounded-xl cursor-pointer bg-[#6443d1] mt-4 h-11`}>
                                            <span className='text-white flex items-center'>
                                                Send Message <AiOutlineMessage className='ml-1' />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product details info card */}

                        <ProductDetailsInfo data={data} />
                        <br />
                        <br />
                    </div>
                ) : null
            }
        </div>
    )
}

const ProductDetailsInfo = ({ data }) => {

    const [active, setActive] = useState(1)

    return (
        <div className='bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded'>
            <div className='w-full flex justify-between border-b pt-10 pb-2'>
                <div className='relative'>
                    <h5 className='text-[#000] text-[18px] leading-5 font-[600] cursor-pointer 800px:text-[20px]'
                        onClick={() => setActive(1)}
                    >
                        Product Details
                    </h5>
                    {active === 1 ? (
                        <div className={`${styles.active_indicator}`}>
                        </div>
                    ) : null}
                </div>
                <div className='relative'>
                    <h5 className='text-[#000] text-[18px] leading-5 font-[600] cursor-pointer 800px:text-[20px]'
                        onClick={() => setActive(2)}
                    >
                        Product Reviews
                    </h5>
                    {active === 2 ? (
                        <div className={`${styles.active_indicator}`}>
                        </div>
                    ) : null}
                </div> <div className='relative'>
                    <h5 className='text-[#000] text-[18px] leading-5 font-[600] cursor-pointer 800px:text-[20px]'
                        onClick={() => setActive(3)}
                    >
                        Seller Information
                    </h5>
                    {active === 3 ? (
                        <div className={`${styles.active_indicator}`}>
                        </div>
                    ) : null}
                </div>
            </div>
            {
                active === 1 ? (
                    <>
                        <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ducimus assumenda ut molestias quae. Deserunt molestias quod ullam voluptates, nostrum ipsam suscipit commodi alias quos quasi dolor distinctio, in labore, doloremque a mollitia laboriosam iusto laudantium asperiores cumque eum sint illo minima nobis. Delectus, nostrum dolores vero expedita, eveniet voluptatem facilis hic voluptates molestiae consequatur saepe repellendus quae praesentium odio temporibus. Impedit eius voluptates deleniti nulla saepe dicta facere voluptatum.
                        </p>
                        <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quam atque cumque, veritatis consequuntur assumenda dolor quisquam corporis delectus quaerat consequatur quae esse mollitia maiores. Quibusdam, non pariatur, hic fugiat voluptatum itaque consequatur adipisci eum sapiente laudantium, quam reiciendis ex eaque nulla ut omnis! Doloribus veniam at ullam ab quidem.
                        </p>
                        <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quam atque cumque, veritatis consequuntur assumenda dolor quisquam corporis delectus quaerat consequatur quae esse mollitia maiores. Quibusdam, non pariatur, hic fugiat voluptatum itaque consequatur adipisci eum sapiente laudantium, quam reiciendis ex eaque nulla ut omnis! Doloribus veniam at ullam ab quidem.
                        </p>
                    </>
                ) : null
            }

            {
                active === 2 ? (
                    <div className='w-full justify-center min-h-[40vh] flex items-center'>
                        <p>
                            No reviews yet!
                        </p>
                    </div>
                ) : null
            }

            {
                active === 3 && (
                    <div className='w-full block 800px:flex p-5'>
                        <div className='w-full 800px:w-[50%]'>
                            <div className='flex items-center'>
                                <img src={data.shop.shop_avatar.url} alt=""
                                    className='w-[50px] h-[50px] rounded-full'
                                />
                                <div className='pl-3'>
                                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                                    <h5 className="pb-2 text-[15px] text-gray-600">
                                        ({data.shop.ratings}) Ratings
                                    </h5>
                                </div>
                            </div>
                            <p className='pt-2'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nobis quas reiciendis libero iusto porro nihil sed molestias distinctio rerum, quisquam dolorem facere ipsam delectus voluptatem consequatur necessitatibus voluptatum sit.
                                </p>
                        </div>
                        <div className='w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end'>
                            <div className='text-left'>
                                <h5 className='font-[600]'>
                                    Joined on: <span className='font-[500]'> 12 Nov 2025 </span>  
                                </h5>
                                <h5 className='font-[600] pt-3'> 
                                    Total Products: <span className='font-[500]'> 1,223 </span>  
                                </h5>
                                <h5 className='font-[600] pt-3'> 
                                    Total Rviews: <span className='font-[500]'> 324 </span>  
                                </h5>

                                <Link to={'/'}>
                                    <div className={`${styles.button} rounded-[4px] h-[39.5px] mt-3`}>
                                        <h4 className='text-white'>
                                            Visit Shop
                                        </h4>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductDetails
