import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/styles'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { backend } from '../../../server'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProdcutsShop } from '../../redux/actions/product'
import { removeFromWishlist, addToWishlist } from "../../redux/actions/wishlist";
import { addToCart } from '../../redux/actions/cart'
import { toast } from 'react-toastify'

const ProductDetails = ({ data }) => {

    const { wishlist } = useSelector((state) => state.wishlist || {})
    const { cart } = useSelector((state) => state.cart || {})
    const { products } = useSelector((state) => state.product || {})
    const { shop } = useSelector((state) => state.seller || {})

    const [count, setCount] = useState(1)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        if(!data) return;

        if (shop && data) {
            dispatch(getAllProdcutsShop(data && data.shop._id))
        }

        const items = wishlist && Array.isArray(wishlist) ? wishlist : [];
        if (items.some((i) => i._id === data._id)) {
            setClick(true)
        } else {
            setClick(false)
        }

    }, [dispatch, shop, data, wishlist])

    const removeFromWishlistHandler = (data) => {
        setClick(!click)
        dispatch(removeFromWishlist(data))
    }

    const addToWishlistHandler = (data) => {
        setClick(!click)
        dispatch(addToWishlist(data))
    }

    const addToCartHandler = (id) => {

        const isItemExist = Array.isArray(cart) && cart.some((i) => i._id === id);
        if (isItemExist) {
            toast.error("Item already in cart!");
            return;
        }
        if (data.stock < 1) {
            toast.error("Product stock limited!");
            return;
        }
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
    }

    // console.log(data?.shop._id)

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

    console.log(data)

    console.log(products)

    return (
        <div className='bg-white'>
            {
                data ? (
                    <div className={`${styles.section} w-[90%] lg:w-[80%]`}>
                        <div className="w-full py-5">
                            <div className='block w-full lg:flex lg:gap-8'>
                                {/* Left side - Images */}
                                <div className='w-full lg:w-[50%]'>
                                    {/* Main selected image */}
                                    <div className='w-full mb-4'>
                                        <img
                                            src={`${backend}/uploads/${data && data.images[select]}`}
                                            alt={data?.name || 'Product'}
                                            className='w-full h-[400px] object-contain rounded'
                                        />
                                    </div>
                                    {/* Thumbnails */}
                                    <div className='w-full flex flex-wrap gap-2'>
                                        {data && data.images.map((img, index) => (
                                            <div
                                                key={index}
                                                className={`cursor-pointer rounded border ${select === index ? 'border-blue-500' : 'border-gray-300'} p-1`}
                                                onClick={() => setSelect(index)}
                                            >
                                                <img
                                                    src={`${backend}/uploads/${img}`}
                                                    alt={`${data?.name} ${index + 1}`}
                                                    className='h-[90px] w-[90px] object-cover'
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Right side - Info */}
                                <div className='w-full lg:w-[50%] pt-5 lg:pt-0'>
                                    <h1 className={`${styles.productTitle} text-[30px] font-[600] mb-2`}>
                                        {data?.name}
                                    </h1>
                                    <p> {data?.description} </p>
                                    <div className='flex pt-3'>
                                        <h4 className={`${styles.productDiscountPrice}`}>
                                            {data?.discountPrice}$
                                        </h4>
                                        <h3 className={`${styles.price}`}>
                                            {data.originalPrice ? data.originalPrice + "$" : null}
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between mt-10 mb-6">
                                        {/* Quantity Counter */}
                                        <div>
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
                                                    onClick={() => removeFromWishlistHandler(data)}
                                                    title="Remove from wishlist"
                                                />
                                            ) : (
                                                <AiOutlineHeart
                                                    size={30}
                                                    className="cursor-pointer"
                                                    color="#333"
                                                    onClick={() => addToWishlistHandler(data)}
                                                    title="Add to wishlist"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className={`${styles.button} mt-6 h-11 flex rounded items-center`}
                                        onClick={() => addToCartHandler(data._id, count)}
                                    >
                                        <span className='text-white flex items-center'>
                                            Add to Cart <AiOutlineShoppingCart className='ml-1' />
                                        </span>
                                    </div>
                                    <div className='flex items-center pt-8'>
                                        <Link to={`/shop/preview/${data.shop._id}`}>
                                            <img
                                            src={`${backend}/uploads/${data?.shop?.avatar}`}
                                            alt=""
                                            className='w-[50px] h-[50px] rounded-full mr-2'
                                            />
                                        </Link>
                                        <div className='pr-8'>
                                            <Link to={`/shop/preview/${data.shop._id}`}>
                                            <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                                {data.shop.name}
                                            </h3>
                                            </Link>
                                            <h5 className='pb-3 text-[15px]'>
                                                (4) Ratings
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

                        <ProductDetailsInfo data={data} products={products} />
                        <br />
                        <br />
                    </div>
                ) : null
            }
        </div>
    )
}

const ProductDetailsInfo = ({ data, products }) => {

    const [active, setActive] = useState(1)

    return (
        <div className='bg-[#f5f6fb] px-3 lg:px-10 py-2 rounded'>
            <div className='w-full flex justify-between border-b pt-10 pb-2'>
                <div className='relative'>
                    <h5 className='text-[#000] text-[18px] leading-5 font-[600] cursor-pointer lg:text-[20px]'
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
                    <h5 className='text-[#000] text-[18px] leading-5 font-[600] cursor-pointer lg:text-[20px]'
                        onClick={() => setActive(2)}
                    >
                        Product Reviews
                    </h5>
                    {active === 2 ? (
                        <div className={`${styles.active_indicator}`}>
                        </div>
                    ) : null}
                </div> <div className='relative'>
                    <h5 className='text-[#000] text-[18px] leading-5 font-[600] cursor-pointer lg:text-[20px]'
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
                    <div className='w-full block lg:flex p-5'>
                        <div className='w-full lg:w-[50%]'>
                            <Link to={`/shop/preview/${data?.shop._id}`} >
                                <div className='flex items-center'>
                                    <img
                                        src={`${backend}/uploads/${data?.shop?.avatar}`}
                                        alt=""
                                        className='w-[50px] h-[50px] rounded-full border mr-2'
                                    /> 
                                    <div className='pl-3'>
                                        <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                                        <h5 className="pb-2 text-[15px] text-gray-600">
                                            (4/5) Ratings
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                            <p className='pt-2'>
                                {data?.shop?.description}
                            </p>
                        </div>
                        <div className='w-full lg:w-[50%] mt-5 lg:mt-0 lg:flex flex-col items-end'>
                            <div className='text-left'>
                                <h5 className='font-[600]'>
                                    Joined on: <span className='font-[500]'> {data?.shop.createdAt.slice(0, 10)} </span>
                                </h5>
                                <h5 className='font-[600] pt-3'>
                                    Total Products: <span className='font-[500]'> {products?.length} </span>
                                </h5>
                                <h5 className='font-[600] pt-3'>
                                    Total Rviews: <span className='font-[500]'> 324 </span>
                                </h5>

                                <Link to={'/'}>
                                    <div className={`${styles.button} rounded-[4px] h-[39.5px] mt-3`}>
                                        <Link to={`/shop/preview/${data.shop._id}`}>
                                        <h4 className='text-white'>
                                            Visit Shop
                                        </h4>
                                        </Link>
                                        
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
