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

const AllProducts = () => {

    const { products , isLoading} = useSelector((state) => state.product)
    const { shop } = useSelector((state) => state.seller)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProdcutsShop(shop._id))
    },[dispatch])

    const handleDelete = (id) => {
      // console.log(id)
      dispatch(deleteShopProduct(id))
      toast.success("product deleted successfully!")
      window.location.reload()
    }

    console.log(products)

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
        field:"stock", 
        headerName: "Stock",
        minWidth:150, 
        flex:0.7
      },
      {
        field:"sold", 
        headerName: "Sold out",
        minWidth:150, 
        flex:0.7
      },
      {
        field:"preview", 
        headerName: "Preview",
        minWidth:100, 
        flex:0.8,
        type: 'number',
        sortable : false,
        renderCell: (params) => {
          const d =  params.row.name
          const product_name  = d.replace(/\+/g,"-");
          return (
            <>
              <Link to={`/product/${product_name}`}>
                <Button>
                  <AiOutlineEye size={30} />
                </Button>
              </Link>
            </>  
          )}
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

    products && products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$" + item.discountPrice,
        stock: item.stock,
        sold: item.sold_out
      })
    })

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div className='w-full mx-8 pt-1 mt-10 bg-white'>
              <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              />
          </div>
        )
      }
    </>
  )
}

export default AllProducts
