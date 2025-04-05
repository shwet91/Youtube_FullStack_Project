import React from 'react'

function UserCard({
    avatar = "https://plus.unsplash.com/premium_photo-1721669059241-0ea09494db78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D",
    title="This is Channel" ,
    userId
}) {

    const onClick = () => {
        console.log("clicked" , userId)
    }
  return (

    <div onClick={onClick} className="border rounded-lg p-2 flex items-center gap-6">
  <div className="w-20 border h-20 rounded-full overflow-hidden">
    <img
      src={avatar}     alt="avatar"
      className="w-full h-full object-cover"
    />
  </div>
  <h1 className='text-white text-4xl' >{title} </h1>
</div>

  )
}

export default UserCard