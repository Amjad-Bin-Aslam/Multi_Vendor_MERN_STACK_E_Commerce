import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../../static/data'
import { AiOutlineUpload } from 'react-icons/ai'
import { createProduct } from '../../redux/actions/product'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const CreateProduct = () => {

    const { shop } = useSelector((state) => state.seller) 
    const { success, error } = useSelector((state) => state.product)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [images , setImages] = useState([]) 
    const [name, setName] = useState('')
    const [description , setDescription] = useState('')
    const [category , setCategory] = useState('')
    const [tags , setTags] = useState('')
    const [originalPrice , setOriginalPrice] = useState()
    const [discountPrice , setDiscountPrice] = useState()
    const [stock, setStock] = useState()

    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch({ type: 'clearError' })
        }
        if(success){
            toast.success("Product Created Successfully!")
            dispatch({ type: 'productCreateReset' })
            navigate('/dashboard')
        }
    },[dispatch,error,success, navigate])

    // clear any leftover errors when component mounts
    useEffect(() => {
      dispatch({ type: 'clearError' })
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault() 

        const newForm =  new FormData()

        images.map((image) => {
            newForm.append('images', image)
        })
        newForm.append('name',name)
        newForm.append('category',category)
        newForm.append('tags',tags)
        newForm.append('description',description)
        newForm.append('stock',stock)
        newForm.append('originalPrice',originalPrice)
        newForm.append('discountPrice',discountPrice)
        newForm.append('shopId',shop._id)

        dispatch(createProduct(newForm));

    }

    const handleImageChange = (e) => {
        e.preventDefault();

        let files = Array.from(e.target.files)
        setImages((prevImages) => [...prevImages, ...files])
    }


  return (
    <div className='w-[90%] lg:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
      <h5 className='text-[30px] font-bold text-center'>
        Create Product
      </h5>

      {/* Crreate Product Form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
            <label className='pb-2'>
                Name<span className='text-red-500'>*</span>
            </label>
            <input 
            type="text" 
            name='name' 
            value={name} 
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            placeholder='Enter product name...'
            onChange={(e)=>setName(e.target.value)} />
        </div>
         <br />
        <div>
            <label className='pb-2'>
                Description<span className='text-red-500'>*</span>
            </label>
            <textarea 
            cols={30}
            rows={8}
            type="text" 
            name='description' 
            value={description} 
            className='mt-2 appearance-none block w-full px-3 pt-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            placeholder='Enter product description...'
            onChange={(e)=>setDescription(e.target.value)}></textarea>
        </div>
         <br />
        <div>
            <label className='pb-2'>
                Category<span className='text-red-500'>*</span>
            </label>
            <select className='w-full mt-2 border border-gray-300 h-[35px] rounded-[5px]'
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            >
                <option value="Choose category">Choose a category</option>
                    {
                        categoriesData && categoriesData.map((item) => (
                            <option value={item.title} key={item.title}>
                                { item.title }
                            </option>
                        ))
                    }
            </select>
        </div>
        <br />
        <div>
            <label className='pb-2'>
                Tags
            </label>
            <input 
            type="text" 
            name='tags' 
            value={tags} 
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            placeholder='Enter product tags...'
            onChange={(e)=>setTags(e.target.value)} />
        </div>
        <br />
        <div>
            <label className='pb-2'>
                Original Price
            </label>
            <input 
            type="number" 
            name='price' 
            value={originalPrice} 
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            placeholder='Enter product price...'
            onChange={(e)=>setOriginalPrice(e.target.value)} />
        </div>
        <br />
        <div>
            <label className='pb-2'>
                Price (With Discount) <span className='text-red-500'>*</span>
            </label>
            <input 
            type="number" 
            name='price' 
            value={discountPrice} 
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            placeholder='Enter product discount price...'
            onChange={(e)=>setDiscountPrice(e.target.value)} />
        </div>
        <br />
        <div>
            <label className='pb-2'>
                Product Stock<span className='text-red-500'>*</span>
            </label>
            <input 
            type="number" 
            name='price' 
            value={stock} 
            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            placeholder='Enter product stock...'
            onChange={(e)=>setStock(e.target.value)} />
        </div>
        <br />
        <div>
            <label className='pb-2'>
                Uploads Images<span className='text-red-500'>*</span>
            </label>
            <input 
            type="file" 
            name="" id="upload" 
            className='hidden' 
            multiple onChange={handleImageChange} 
            />
            <div className='w-full flex items-center flex-wrap'>
                <label htmlFor="upload">
                <AiOutlineUpload
                size={30}
                className='mt-3 cursor-pointer'
                color='#555'
                />
            </label>
            {
                images && images.map((item) => (
                    <img 
                    src={URL.createObjectURL(item)} alt="" 
                    key={item}
                    className='h-[120px] w-[120px] object-cover m-2'
                    />
                ))
            }
            </div>
        </div>
        <br />
        <div>
                <input type="submit" value="Create" 
                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer hover:bg-blue-300'
                />
            </div>

      </form>

    </div>
  )
}

export default CreateProduct
