import React from 'react'
import SignupForm from '@/components/Auth/SignupForm'

function Signup() {
  return (
    <div className='w-full h-full bg-slate-900 flex items-center justify-center ' >

      <div className=' p-5 flex items-center justify-center wrap flex-col gap-3 relative'>
      <h1 className='text-white font-mono text-center text-2xl' >Sign Up here</h1>
          <SignupForm className={"test-white"} ></SignupForm>
      </div>

    </div>
  )
}

export default Signup