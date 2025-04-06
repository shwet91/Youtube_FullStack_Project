import React from 'react'
import { Button } from '../ui/button'
import { simpleFetch } from '@/backend/simpleFetch'
import api from '@/backend/api'
import { logout } from '@/store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Icons } from '../Icons/Icons'

function Logout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading , setLoading] = useState(false)

    const logoutHandler = async() => {
      if (loading) return; // Prevent duplicate requests
      setLoading(true);
      dispatch(logout())



        const response = await simpleFetch({
            url : api.LogoutUser , 
            method : "Post" 
        })
         
        dispatch(logout())
        navigate("/")
        console.log(response)
        setLoading(false);
    }

  return (

    <div>
     <Button className="bg-rose-800 hover:bg-rose-950" onClick={logoutHandler} >LogOut</Button>
       <div className=' flex justify-center h-28 '>
         {
           loading ? <Icons.spinner className="mr-2 h-10 w-10 animate-spin text-white" /> : null
         }
     
       </div>
    </div>
  )
}

export default Logout