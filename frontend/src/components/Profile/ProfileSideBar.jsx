import React from 'react'
import { AiOutlineCreditCard, AiOutlineLogout } from 'react-icons/ai';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi'
import { MdOutlineLock, MdOutlineMessage, MdOutlineTrackChanges } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import { RxPerson } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { server } from '../../../server';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const ProfileSideBar = ({setActive,active}) => {

  const navigate = useNavigate()
  const dispatch =  useDispatch()

  const logoutHandler = () => {
    axios.post(`${server}/api/user/logout-user`, {},{ withCredentials: true }).then((res) => {
      toast.success(res.data.message)
      dispatch({ type: "logoutUser" })
      // window.location.reload(true)
      navigate('/login')
    }).catch((err)=>{
      console.log(err.response?.data?.message || err.message)
    })
  }

  return (
    <div className='w-full bg-white shadow-sm rounded-[10px] p-4 pt-8'>

      {/* Profile */}
      <div className='flex items-center cursor-pointer w-full mb-4 md:mb-8 px-2 md:px-0'
      onClick={() => setActive(1) }
      >
        <RxPerson size={18} md:size={20} color={active === 1 ? 'red' : null} />
        <span className={`pl-2 md:pl-3 text-sm md:text-base ${active === 1 ? 'text-[red]' : null}`}>
          Profile
        </span>
      </div>
      {/* Shopping */}
      <div className='flex items-center cursor-pointer w-full mb-4 md:mb-8 px-2 md:px-0'
      onClick={() => setActive(2) }
      >
        <HiOutlineShoppingBag size={18} md:size={20} color={active === 2 ? 'red' : null} />
        <span className={`pl-2 md:pl-3 text-sm md:text-base ${active === 2 ? 'text-[red]' : null}`}>
          Orders
        </span>
      </div>
      {/* Refunds */}
      <div className='flex items-center cursor-pointer w-full mb-4 md:mb-8 px-2 md:px-0'
      onClick={() => setActive(3) }
      >
        <HiOutlineReceiptRefund size={18} md:size={20} color={active === 3 ? 'red' : null} />
        <span className={`pl-2 md:pl-3 text-sm md:text-base ${active === 3 ? 'text-[red]' : null}`}>
          Refunds
        </span>
      </div>
      {/* Inbox */}
      <div className='flex items-center cursor-pointer w-full mb-4 md:mb-8 px-2 md:px-0'
      onClick={() => setActive(4) || navigate('/inbox') }
      >
        <MdOutlineMessage size={18} md:size={20} color={active === 4 ? 'red' : null} />
        <span className={`pl-2 md:pl-3 text-sm md:text-base ${active === 4 ? 'text-[red]' : null}`}>
          Inbox
        </span>
      </div>
      {/* Track order */}
      <div className='flex items-center cursor-pointer w-full mb-4 md:mb-8 px-2 md:px-0'
      onClick={() => setActive(5) }
      >
        <MdOutlineTrackChanges size={18} md:size={20} color={active === 5 ? 'red' : null} />
        <span className={`pl-2 md:pl-3 text-sm md:text-base ${active === 5 ? 'text-[red]' : null}`}>
          Track Order
        </span>
      </div>
      {/* Payment Method */}
      <div className='flex items-center cursor-pointer w-full mb-4 md:mb-8 px-2 md:px-0'
      onClick={() => setActive(6) }
      >
        <MdOutlineLock size={18} md:size={20} color={active === 6 ? 'red' : null} />
        <span className={`pl-2 md:pl-3 text-sm md:text-base ${active === 6 ? 'text-[red]' : null}`}>
          Change Password
        </span>
      </div>
      {/* Address */}
      <div className='flex items-center cursor-pointer w-full mb-4 md:mb-8 px-2 md:px-0'
      onClick={() => setActive(7) }
      >
        <FaAddressBook size={18} md:size={20} color={active === 7 ? 'red' : null} />
        <span className={`pl-2 md:pl-3 text-sm md:text-base ${active === 7 ? 'text-[red]' : null}`}>
          Address
        </span>
      </div>
      {/* Logout */}
      <div className='flex items-center cursor-pointer w-full mb-4 md:mb-8 px-2 md:px-0'
      onClick={() => setActive(8) || logoutHandler() }
      >
        <AiOutlineLogout size={18} md:size={20} color={active === 8 ? 'red' : null} />
        <span className={`pl-2 md:pl-3 text-sm md:text-base ${active === 8 ? 'text-[red]' : null}`}>
          Logout
        </span>
      </div>

    </div>
  )
}

export default ProfileSideBar
