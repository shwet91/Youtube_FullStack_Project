import React from 'react'
import LoginForm from '@/components/Auth/LoginForm'
import Store from '@/components/Store'



function Login() {
 
  return (

    <div className='w-full h-full bg-slate-900 flex items-center justify-center' >
      <div className=' p-5 flex items-center justify-center wrap flex-col gap-3 relative'>
      <h1 className='text-white font-mono text-center text-2xl' > Please Login To use all features</h1>
      <LoginForm></LoginForm>
      </div>
         
    </div>
  )
}

export default Login