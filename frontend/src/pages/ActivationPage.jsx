import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../../server';
import { toast } from 'react-toastify';

const ActivationPage = () => {
 
  const { activation_token } = useParams();
  const [error, setError] = useState(false)

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/api/user/activation`, {
            activation_token,
          })
          .then((res) => {
            toast.success(res.data.message)
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div className='flex h-[100vh] w-full align-items-center justify-center'>

      {
        error
          ? (
            <p>Your token is expired!</p>
          )
          : (
            <p>Your account has been created successfully.</p>
          )
      }

    </div>
  )
}

export default ActivationPage
