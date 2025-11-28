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
import { updateUserInformation, loadUser, updateUserAddress, deleteUserAddress } from '../../redux/actions/user';
import { toast } from 'react-toastify';
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';
import { City, Country, State } from 'country-state-city';


const ProfileContent = ({active}) => {

    const {user, error} = useSelector((state) => state.user);
    const [avatar, setAvatar] = useState(null)
 
    const dispatch = useDispatch();
    
    const [name , setName] = useState(user && user.name)
    const [email , setEmail] = useState( user && user.email )
    const [phoneNumber , setPhoneNumber] = useState(user && user.phoneNumber)
    const [password , setPassword] = useState("") 

    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({
          type: "clearError"
        })
      }
    }, [error])

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
                <ChangePassword />
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


const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault()

    await axios.put(`${server}/api/user/change-user-password`,{oldPassword,newPassword,confirmPassword}, {withCredentials: true} ).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message)
      } else {
        toast.success(res.data.message)
        setNewPassword('')
        setOldPassword('')
        setConfirmPassword('')
      }
      console.log(res.data)
    }).catch((err) => {
      toast.error(err.response?.data?.message || err.message)
      console.log(err)      
    })

  }

    return (
        <div className='w-full px-4 md:px-5'>
            
                <h1 className='block text-center text-[20px] md:text-[25px] f font-[600] text-[#000000ba] pb-2'>
                    Change Password
                </h1>

                <div className='w-full'>
                   <form aria-required action="" onSubmit={passwordChangeHandler} className='flex flex-col items-center' >
                      <div className='w-full mt-5 sm:w-[70%]'>
                        <label className='block pb-2 text-sm md:text-base'>
                          Enter old password
                        </label>
                        <input type="password" className={`${styles.input} bg-white !w-full`} 
                            required
                            value={oldPassword}
                            onChange={(e)=>setOldPassword(e.target.value)}
                            />
                      </div>
                      <div className='w-full mt-2 sm:w-[70%]'>
                        <label className='block pb-2 text-sm md:text-base'>
                          Enter new password
                        </label>
                        <input type="password" className={`${styles.input} bg-white !w-full`} 
                        required
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                            />
                      </div>
                      <div className='w-full mt-5 sm:w-[70%]'>
                        <label className='block pb-2 text-sm md:text-base'>
                          Enter confirm password
                        </label>
                        <input type="password" className={`${styles.input} bg-white !w-full`} 
                        required
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                      </div>


                      <input 
                       type="submit" 
                       value="Update"
                       className={`w-full sm:w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                       />

                   </form>
                </div>
               
        </div>
    )
}


const Address = () => {

  const {error, successMessage,user} = useSelector((state) => state.user);

  const [open,setOpen] = useState(false)
  const [country,setCountry] = useState("")
  const [state,setState] = useState("")
  const [city,setCity] = useState("")
  const [zipCode ,setZipCode] = useState("")
  const [address1 ,setAddress1] = useState("")
  const [address2 ,setAddress2] = useState("")
  const [addressType ,setAddressType] = useState("")

  const dispatch = useDispatch()


  const addressTypeData = [
    {
      name: "Default"
    },
    { 
      name: "Home"
    },
    { 
      name: "Office"
    }
  ]

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearMessages" });
    }
    if (successMessage) {
      toast.success(successMessage);
      setOpen(false);
      setCountry('');
      setCity('');
      setAddress1('');
      setAddress2('');
      setAddressType('');
      dispatch({ type: "clearMessages" });
      dispatch(loadUser());
    }
  }, [error, successMessage, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault()  

    if(!addressType || !city || !country){
        toast.error("All fields are required!")
        return;
    } else {
      dispatch(updateUserAddress(country,state,city,address1,address2,zipCode,addressType));
    }
  }


  const handleDelete = (item) => {
      dispatch(deleteUserAddress(item._id));
      dispatch(loadUser());
  }

    return (
        <div className='w-full px-4 md:px-5'>
          { open && (
            <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
                <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
                    <RxCross1
                    size={30}
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition cursor-pointer"
                    onClick={() =>setOpen(false)}
                    />
                    <h1 className='text-center text-[25px] font-semibold'>
                      Add New Address
                    </h1>
                    <div className="w-full">
                      <form aria-required onSubmit={handleSubmit} className='w-full'>
                        <div className="w-full block p-4">

                          <div className='w-full pb-2'>
                          <label className='block pb-2'>
                              Country
                          </label>
                          <select 
                          name="" id="" 
                          value={country} 
                          onChange={(e) => setCountry(e.target.value)}
                          className='w-[95%] border border-gray-300 h-[40px] rounded-[5px]'
                          >
                            <option value="block pb-2">
                              choose your country
                            </option>
                            {
                               Country && Country.getAllCountries().map((item,isoCode) => (
                                <option className='block pb-2' key={isoCode}
                                value={item.isoCode}
                                >
                                  { item.name }
                                </option>
                              ))
                            }
                          </select>
                          </div>

                          <div className='w-full pb-2'>
                          <label className='block pb-2'>
                              State
                          </label>
                          <select 
                          name="" id="" 
                          value={state} 
                          onChange={(e) => setState(e.target.value)}
                          className='w-[95%] border border-gray-300 h-[40px] rounded-[5px]'
                          >
                            <option value="block pb-2">
                              choose your state
                            </option>
                            {
                              State && State.getStatesOfCountry(country).map((item,isoCode) => (
                                <option className='block pb-2' key={isoCode}
                                value={item.isoCode}
                                >
                                  { item.name }
                                </option>
                              ))
                            }
                          </select>
                          </div>

                          <div className='w-full pb-2'>
                          <label className='block pb-2'>
                              City
                          </label>
                          <select 
                          name="" id="" 
                          value={city} 
                          onChange={(e) => setCity(e.target.value)}
                          className='w-[95%] border border-gray-300 h-[40px] rounded-[5px]'
                          >
                            <option value="block pb-2">
                              choose your city
                            </option>
                            {
                              City && City.getCitiesOfState(country,state).map((item,isoCode) => (
                                <option className='block pb-2' key={isoCode}
                                value={item.isoCode}
                                >
                                  { item.name }
                                </option>
                              ))
                            }
                          </select>
                          </div>

                          <div className='w-full pb-2'>
                            <label className='block pb-2 '> Address 1 </label>
                            <input type="address" 
                            className="w-[95%] border border-gray-300 h-[40px] rounded-[5px] px-2"
                            required
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            />
                          </div>

                          
                          <div className='w-full pb-2'>
                            <label className='block pb-2 '> Address 2 </label>
                            <input type="address" 
                            className="w-[95%] border border-gray-300 h-[40px] rounded-[5px] px-2"
                            required
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                            />
                          </div>

                          
                          <div className='w-full pb-2'>
                            <label className='block pb-2 '> Zip Code </label>
                            <input type="address" 
                            className="w-[95%] border border-gray-300 h-[40px] rounded-[5px] px-2"
                            required
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            />
                          </div>

                          <div className='w-full pb-2'>
                          <label className='block pb-2'>
                              Address Type
                          </label>
                          <select 
                          name="" id="" 
                          value={addressType} 
                          onChange={(e) => setAddressType(e.target.value)}
                          className='w-[95%] border border-gray-300 h-[40px] rounded-[5px]'
                          >
                            <option value="block pb-2">
                              Choose your address type
                            </option>
                            {
                              addressTypeData && addressTypeData.map((item,index) => (
                                <option className='block pb-2' key={index}>
                                  { item.name }
                                </option>
                              ))
                            }
                          </select>
                          </div>

                          <div className='w-full pb-2 items-center justify-center flex'>
                            <button className="bg-blue-500 text-white px-5 py-3 rounded-md mt-4 hover:opacity-90 transition cursor-pointer">
                              Save Address
                            </button>
                          </div>     


                        </div>
                     </form>


                  </div>
               </div>
            </div>
          )} 
            <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <h1 className='text-[20px] md:text-[25px] font-[600] text-[#000000ba] pb-2'>
                    My Addresses
                </h1>
                <div className={`${styles.button} rounded-md`}
                onClick={() => setOpen(true)}
                >
                    <span className='text-[#fff]'>Add New Address</span>
                </div>
            </div>
            <br />
            {
              Array.isArray(user?.addresses) && user.addresses.map((item, index) => (
                <div key={index}>
                     <div className='w-full bg-white h-auto md:h-[70px] rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center px-3 shadow justify-between pr-4 md:pr-10 gap-4 py-3 md:py-0'>
                <div className="flex items-center gap-2">
                    <h5 className='font-[600] text-sm md:text-base'>{item.addressType}</h5>
                </div>
                <div className='pl-0 md:pl-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-0'>
                    <h6 className='text-sm md:text-base'> { item.address1 }, { item.address2 } </h6>
                </div>
                <div className='pl-0 md:pl-8 flex items-center'>
                    <h6 className='text-sm md:text-base'> { user && user.phoneNumber } </h6>
                </div>
                <div>
                    <div className="flex items-center justify-between pl-0 md:pl-8">
                        <AiOutlineDelete size={20} className='cursor-pointer hover:text-red-600' 
                        onClick={() => handleDelete(item)}
                        />
                    </div>
                </div>
            </div>
                </div>
              ))
            }

            {
              Array.isArray(user?.addresses) && user.addresses.length === 0 && (
                <h1 className='text-center text-gray-500 pt-20 text-lg'>
                  No addresses added yet.
                </h1>
              )
            }
            
        </div>
    )
}



export default ProfileContent
 
 
 