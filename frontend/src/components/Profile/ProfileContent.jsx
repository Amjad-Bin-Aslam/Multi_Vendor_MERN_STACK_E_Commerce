import React, { useState } from 'react'
import { backend } from '../../../server'
import { useSelector } from 'react-redux'
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import 'react-data-grid/lib/styles.css';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { MdOutlineTrackChanges } from 'react-icons/md';


const ProfileContent = ({active}) => {

    const {user} = useSelector((state) => state.user);
    
    const [name , setName] = useState(user && user.name)
    const [email , setEmail] = useState( user && user.email )
    const [phoneNumber , setPhoneNumber] = useState(null)
    const [zipCode , setZipCode] = useState()
    const [address1 , setAddress1] = useState("")
    const [address2 , setAddress2] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
    }
 
  return (
    <div className='w-full'>

        {/* Profile */}
      {
        active === 1 && (
            <>
            <div className='flex justify-center w-full'>
                <div className="relative">
                   <img
                    className='w-[150px] h-[150px] object-cover rounded-full border-[3px] border-[#3ad123]'
                    src={`${backend}${user?.avatar}`}
                    alt="user"
                    />   
                    <div className='w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]'>
                        <AiOutlineCamera />
                    </div>
                </div> 
            </div>
            <br />
            <br /> 
            <div className='w-full px-5'>
                    <form onSubmit={handleSubmit} aria-required={true}>

                        {/* Name and Email */}
                       <div className='w-full flex pb-3'>
                         <div className='w-[50%]'>
                            <label className='block pb-2'>
                                Full Name
                            </label>
                            <input type="text" className={`${styles.input} bg-white !w-[95%]`} 
                            required
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />
                         </div>
                         <div className='w-[50%]'>
                            <label className='block pb-2'>
                                Email
                            </label>
                            <input type="email" className={`${styles.input} bg-white !w-[95%]`} 
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                         </div>
                       </div> 

                        {/* Number and ZipCode */}
                        <div className='w-full flex pb-3'>
                         <div className='w-[50%]'>
                            <label className='block pb-2'>
                                Phone Number
                            </label>
                            <input type="number" className={`${styles.input} bg-white !w-[95%]`} 
                            required
                            value={phoneNumber}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                            />
                         </div>
                         <div className='w-[50%]'>
                            <label className='block pb-2'>
                                Zip Code
                            </label>
                            <input type="number" className={`${styles.input} bg-white !w-[95%]`} 
                            required
                            value={zipCode}
                            onChange={(e)=>setZipCode(e.target.value)}
                            />
                         </div>
                       </div>

                       {/* Address */}
                       <div className='w-full flex pb-3'>
                         <div className='w-[50%]'>
                            <label className='block pb-2'>
                                Address 1
                            </label>
                            <input type="address" className={`${styles.input} bg-white !w-[95%]`} 
                            required
                            value={address1}
                            onChange={(e)=>setAddress1(e.target.value)}
                            />
                         </div>
                         <div className='w-[50%]'>
                            <label className='block pb-2'>
                                Address 2
                            </label>
                            <input type="address" className={`${styles.input} bg-white !w-[95%]`} 
                            required
                            value={address2}
                            onChange={(e)=>setAddress2(e.target.value)}
                            />
                         </div>
                       </div> 

                       <input 
                       type="submit" 
                       value="Update"
                       className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                       />

                    </form>
            </div>
            </>
        )
      }

      {/* Orders */}
      {
      active === 2 && (
        <div>
            <AllOrders />
        </div>
      )
      }

      {/* Refund */}
      {
        active === 3 && (
            <div>
                <AllRefundOrders />
            </div>
        )
      }

      {/* Track Orders */}
      {
        active === 5 && (
            <div>
                <TrackOrder />
            </div>
        )
      }

      {/* Payment Methods */}
      {
        active === 6 && (
            <div>
                <PaymentMethod />
            </div>
        )
      }

      {/* User Address */}
      {
        active === 7 && (
            <div>
                <Address />
            </div>
        )
      }
 
    </div>
  )
}


const AllOrders = () => {

  const orders = [
    {
      _id: "23456y5&#3gf",
      orderItems: [
        {
          name: "iPhone 15 Pro",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    {
      field: "orderId",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "actions",
      headerName: "",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        orderId: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};


const AllRefundOrders = () => {

    const orders = [
    {
      _id: "23456y5&#3gf",
      orderItems: [
        {
          name: "iPhone 15 Pro",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    {
      field: "orderId",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "actions",
      headerName: "",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];

  orders && orders.forEach((item) => {
    row.push({
        id: item._id,
        orderId: item._id,
        itemsQty: item.orderItems.length,
        total: "US$" + item.totalPrice,
        status: item.orderStatus
    })
  } )

    return(
        <div className='pl-8 pt-1'>
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


const TrackOrder = () => {

    const orders = [
    {
      _id: "23456y5&#3gf",
      orderItems: [
        {
          name: "iPhone 15 Pro",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
    ];

    const columns = [
    {
      field: "orderId",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "",
      headerName: "",
      minWidth: 130,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <Button>
              <MdOutlineTrackChanges size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];

  orders && orders.forEach((item) => {
    row.push({
        id: item._id,
        orderId: item._id,
        itemsQty: item.orderItems.length,
        total: "US$" + item.totalPrice,
        status: item.orderStatus
    })
  })

  console.log(orders)

    return (
        <div className='pl-8 pt-1'>
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


const PaymentMethod = () => {
    return (
        <div className='w-full px-5'>
            <div className='w-full flex justify-between items-center'>
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>
                    Payment Methods
                </h1>
                <div className={`${styles.button} rounded-md`}>
                    <span className='text-[#fff]'>Add New</span>
                </div>
            </div>
            <br />
            <div className='w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10'>
                <div className="flex item-center">
                    <img 
                    src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" 
                    alt="" 
                    />
                    <h5 className='pl-5 font-[600]'>Amjad Aslam</h5>
                </div>
                <div className='pl-8 flex items-center'>
                    <h6> 123456**** </h6>
                    <h5 className='pl-6'> 08/08/2028 </h5>
                </div>
                <div>
                    <div className="min-w-[10%] flex items-center justify-between pl-8">
                        <AiOutlineDelete size={25} className='cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
}


const Address = () => {
    return (
        <div className='w-full px-5'>
            <div className='w-full flex justify-between items-center'>
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>
                    My Addresses
                </h1>
                <div className={`${styles.button} rounded-md`}>
                    <span className='text-[#fff]'>Add New</span>
                </div>
            </div>
            <br />
            <div className='w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10'>
                <div className="flex item-center">
                    <h5 className='pl-5 font-[600]'>Default Address</h5>
                </div>
                <div className='pl-8 flex items-center'>
                    <h6> 494 Eden Garden, Joyland, UK </h6>
                </div>
                <div className='pl-8 flex items-center'>
                    <h6> Ph: +923154854986 </h6>
                </div>
                <div>
                    <div className="min-w-[10%] flex items-center justify-between pl-8">
                        <AiOutlineDelete size={25} className='cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ProfileContent
 
 
 