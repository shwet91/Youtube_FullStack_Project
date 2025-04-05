import React, { useEffect } from 'react'
import UploadVideo from '@/components/VideoSection/UploadVideo'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PublishVideo() {
  const navigate = useNavigate()
   const isLoggedIn = useSelector((state) => state.auth.status)

   useEffect(() => {
    if(!isLoggedIn){
      navigate("/login")
    }
   }, [])
  return (
    <div className='w-full h-full bg-slate-900 flex items-center justify-center flex-col gap-5' >
      <h1 className='text-gray-500 text-center text-4xl' >Upload Video</h1>

      <UploadVideo></UploadVideo>

    </div>
  )
}

export default PublishVideo