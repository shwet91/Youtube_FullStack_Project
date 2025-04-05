import React from 'react'
import { Button } from '../ui/button'
import { simpleFetch } from '@/backend/simpleFetch'
import api from '@/backend/api'
import { logout } from '@/store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const logoutHandler = async() => {

        const response = await simpleFetch({
            url : api.LogoutUser , 
            method : "Post" 
        })
         
        dispatch(logout())
        navigate("/")
        console.log(response)
    }

  return (

    <div>
     <Button className="bg-rose-800 hover:bg-rose-950" onClick={logoutHandler} >LogOut</Button>
    </div>
  )
}

export default Logout