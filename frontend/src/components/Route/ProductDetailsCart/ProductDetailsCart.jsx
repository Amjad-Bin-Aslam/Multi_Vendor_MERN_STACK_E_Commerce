import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineLineChart,
  AiOutlineMessage,
} from "react-icons/ai";
import styles from "../../../styles/styles";

const ProductDetailsCart = ({ setOpen, data }) => {

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const incrementCount = () => {
    setCount(count + 1)
  }
  const decrementCount = () => {
    if(count > 1) {
        setCount(count - 1)
    }
  }

  const handleMessageSubmit = () => {
    alert("Message sent to seller!");
  };

  return (
    <>
      {data && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {/* Modal Container */}
          <div className="relative w-[95%] max-w-[1000px] h-[70vh] bg-white rounded-md shadow-lg overflow-y-auto p-5 sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition cursor-pointer"
            >
              <RxCross1 size={28} />
            </button>

            {/* Main Flex Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: Product Image + Seller Info */}
              <div className="flex-1 flex flex-col items-center lg:items-start">
                <img
                  src={data.image_Url[0].url}
                  alt={data.name}
                  className="w-full max-w-[400px] rounded-md object-contain"
                />

                {/* Seller Info */}
                <div className="flex items-center mt-5">
                  <img
                    className="w-[50px] h-[50px] rounded-full mr-3"
                    src={data.shop.shop_avatar.url}
                    alt={data.shop.name}
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="text-[15px] text-gray-600">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>

                {/* Message Button */}
                <button
                  onClick={handleMessageSubmit}
                  className="mt-4 flex items-center gap-2 bg-[#000] text-white px-5 py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
                >
                  Send Message
                  <AiOutlineMessage size={20} />
                </button>

                <h5 className="text-[16px] text-red-600 mt-5">
                  ({data.total_sell}) Sold out
                </h5>
              </div>

              {/* Right: Product Details */}
              <div className="flex-1 pt-3">
                <h1 className={`${styles.productTitle} text-[22px] mb-2`}>
                  {data.name}
                </h1>

                <p className="text-gray-700 leading-relaxed text-[15px] mb-4">
                  {data.description}
                </p>

                {/* Price Section */}
                <div className="flex items-center gap-3 mb-4">
                  <h4 className={`${styles.productDiscountPrice} text-[20px]`}>
                    ${data.discount_price}
                  </h4>
                  {data.price && (
                    <h3 className={`${styles.price} line-through text-gray-500`}>
                      ${data.price}
                    </h3>
                  )}
                </div>

                {/* Quantity + Wishlist */}
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

                {/* Add to Cart */}
                <button
                  onClick={() => alert("Added to cart!")}
                  className={`${styles.button} w-full sm:w-auto flex items-center justify-center gap-2 rounded-md h-11 px-3`}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineLineChart className="ml-1" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsCart;
