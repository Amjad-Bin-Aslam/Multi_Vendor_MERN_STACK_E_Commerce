import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../../server';

const ActivationPage = () => {
  
  const { activation_token } = useParams();
  const [error , setError] = useState(false)

  useEffect(()=> {

    if(activation_token){
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/api/user/activation`, {activation_token})
          console.log(res.data)
        } catch (error) {
          console.log(error.response.data.message)
        }
      }
      activationEmail();
    }

  },[activation_token])

  return (
    <div>
      activation page
    </div>
  )
}

export default ActivationPage
