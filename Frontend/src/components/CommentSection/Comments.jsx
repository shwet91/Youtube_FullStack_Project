import React from 'react'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function Comments({comments = []}) {


    const [comment , setComment] = useState("Add Comment to this video")

    const addCommentHandler = () => {
     // take comment from comment and send post request to the server to upload it 
    }

  return (

    <div  className='border-2 border-black p-2 sm:w-3/5  '>
     <div className='addComment relative'>
        <Input placeholder="Enter your comment..." onChange={(e) => setComment(e.target.value)} type="text" className="w-4/5 placeholder-black inline-block"  />
        <Button onClick={addCommentHandler} className=" absolute right-0" >Add Comment</Button>
     </div> 

     {/* <div className='showComment'>
       {
        comments.map((each , i) => (
            <div key={i} >
            <Input value={each.content} ></Input>
            <p> commented by: {each.owner}</p>
            </div>
        ))
       }
     </div> */}

<div className='showComment'>
  {/* {loop on this component and render all the comments} */}
            <hr />
            <div className='  relative'  >

             <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin tincidunt, velit ut consectetur viverra, risus turpis suscipit justo, eget feugiat ligula libero non lorem. Fusce in semper nisi. Integer vel risus eget odio vehicula tempor ac ut velit. Donec ac mauris."}</p>
            <p className='text-right text-white' > commented by: {"Harsih"}</p>
            </div>
       
     </div>


    </div>

    
  )
}

export default Comments