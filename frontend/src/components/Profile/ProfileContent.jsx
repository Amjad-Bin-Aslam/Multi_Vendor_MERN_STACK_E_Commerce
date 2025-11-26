import React, { useEffect, useState } from 'react'
import { backend, server } from '../../../server'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import 'react-data-grid/lib/styles.css';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { updateUserInformation, loadUser } from '../../redux/actions/user';
import { toast } from 'react-toastify';
import axios from 'axios';


const ProfileContent = ({active}) => {

    const {user, success} = useSelector((state) => state.user);
    const [avatar, setAvatar] = useState(null)

    const dispatch = useDispatch();
    
    const [name , setName] = useState(user && user.name)
    const [email , setEmail] = useState( user && user.email )
    const [phoneNumber , setPhoneNumber] = useState(user && user.phoneNumber)
    const [password , setPassword] = useState("") 

    useEffect(() => {
      if(success){
        toast.success("User Information Updated Successfully!")
      }
    }, [success])

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(updateUserInformation(name,email,phoneNumber,password))
    }

    const handleImage = async (e) => {
        const file =  e.target.files[0]
        setAvatar(file)

        const formData = new FormData()

        formData.append('file', e.target.files[0])

        await axios.put(`${server}/api/user/update-user-avatar`, formData, {
          headers: {"Content-Type" : "multipart/form-data" } , withCredentials: true
        }).then((res) => {
          dispatch(loadUser());
          toast.success("Avatar Updated Successfully!")
        }).catch((err) => {
          toast.error(err)
        })
    }
 
  return (
    <div className='w-full px-4 md:px-0'>

        {/* Profile */}
      {
        active === 1 && (
            <>
            <div className='flex justify-center w-full'>
                <div className="relative">
                   <img
                    className='w-[120px] h-[120px] md:w-[150px] md:h-[150px] object-cover rounded-full border-[3px] border-[#3ad123]'
                    src={user?.avatar?.url ? `${backend}/${user.avatar.url}` : 'https://via.placeholder.com/60'}
                    alt="user"
                    />   
                    <div className='w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]'>
                      <input 
                      type="file"
                      id='image'
                      className='hidden'
                      onChange={handleImage}
                      />
                      <label htmlFor="image">
                        <AiOutlineCamera />
                      </label>
                    </div>
                </div> 
            </div>
            <br /> 
            <br /> 
            <div className='w-full px-4 md:px-5'>
                    <form onSubmit={handleSubmit} aria-required={true}>

                        {/* Name and Email */}
                       <div className='w-full flex flex-col sm:flex-row gap-4 pb-3'>
                         <div className='w-full sm:w-[50%]'>
                            <label className='block pb-2 text-sm md:text-base'>
                                Full Name
                            </label>
                            <input type="text" className={`${styles.input} bg-white !w-full`} 
                            required
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />
                         </div>
                         <div className='w-full sm:w-[50%]'>
                            <label className='block pb-2 text-sm md:text-base'>
                                Email Address
                            </label>
                            <input type="email" className={`${styles.input} bg-white !w-full`} 
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                         </div>
                       </div> 

                        {/* Number and ZipCode */}
                        <div className='w-full flex flex-col sm:flex-row gap-4 pb-3'>
                         <div className='w-full sm:w-[50%]'>
                            <label className='block pb-2 text-sm md:text-base'>
                                Phone Number
                            </label>
                            <input type="number" className={`${styles.input} bg-white !w-full`} 
                            required
                            value={phoneNumber}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                            />
                         </div>
                         <div className='w-full sm:w-[50%]'>
                            <label className='block pb-2 text-sm md:text-base'>
                                Enter your password
                            </label>
                            <input type="password" className={`${styles.input} bg-white !w-full`} 
                            required
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                         </div>
                       </div>


                       <input 
                       type="submit" 
                       value="Update"
                       className={`w-full sm:w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
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
    <div className="pl-0 md:pl-8 pt-1 overflow-x-auto">
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
        <div className='pl-0 md:pl-8 pt-1 overflow-x-auto'>
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
        <div className='pl-0 md:pl-8 pt-1 overflow-x-auto'>
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
        <div className='w-full px-4 md:px-5'>
            <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <h1 className='text-[20px] md:text-[25px] font-[600] text-[#000000ba] pb-2'>
                    Payment Methods
                </h1>
                <div className={`${styles.button} rounded-md`}>
                    <span className='text-[#fff]'>Add New</span>
                </div>
            </div>
            <br />
            <div className='w-full bg-white h-auto md:h-[70px] rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center px-3 shadow justify-between pr-4 md:pr-10 gap-4 py-3 md:py-0'>
                <div className="flex items-center gap-2">
                    <img 
                    src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" 
                    alt="" 
                    />
                    <h5 className='font-[600] text-sm md:text-base'>Amjad Aslam</h5>
                </div>
                <div className='pl-0 md:pl-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-0'>
                    <h6 className='text-sm md:text-base'> 123456**** </h6>
                    <h5 className='pl-0 md:pl-6 text-sm md:text-base'> 08/08/2028 </h5>
                </div>
                <div>
                    <div className="flex items-center justify-between pl-0 md:pl-8">
                        <AiOutlineDelete size={20} className='cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
}


const Address = () => {
    return (
        <div className='w-full px-4 md:px-5'>
            <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <h1 className='text-[20px] md:text-[25px] font-[600] text-[#000000ba] pb-2'>
                    My Addresses
                </h1>
                <div className={`${styles.button} rounded-md`}>
                    <span className='text-[#fff]'>Add New</span>
                </div>
            </div>
            <br />
            <div className='w-full bg-white h-auto md:h-[70px] rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center px-3 shadow justify-between pr-4 md:pr-10 gap-4 py-3 md:py-0'>
                <div className="flex items-center gap-2">
                    <h5 className='font-[600] text-sm md:text-base'>Default Address</h5>
                </div>
                <div className='pl-0 md:pl-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-0'>
                    <h6 className='text-sm md:text-base'> 494 Eden Garden, Joyland, UK </h6>
                </div>
                <div className='pl-0 md:pl-8 flex items-center'>
                    <h6 className='text-sm md:text-base'> Ph: +923154854986 </h6>
                </div>
                <div>
                    <div className="flex items-center justify-between pl-0 md:pl-8">
                        <AiOutlineDelete size={20} className='cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ProfileContent
 
 
 