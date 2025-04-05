import React, { useEffect } from 'react'
import VideoPlayer from '@/components/VideoSection/VideoPlayer'
import VideoDescription from '@/components/VideoSection/VideoDescription'
import { simpleFetch } from '@/backend/simpleFetch'
import api from '@/backend/api'
import { useParams } from 'react-router-dom'

function VideoPlay() {

  const { videoId } = useParams()

  useEffect(() => {

 const increaseViews = async () => {
  try {
    // fetch for increasing views
     await simpleFetch({
      url :` ${api.increaseViedoViews}/${videoId}`,
      method : "POST"
    }) ;
    // fetch for


    
    
  } catch (error) {
    console.error(error.message);
    throw error
  }
 }

 increaseViews()
  } , [videoId])

  

  return (
    <div className='flex w-full items-center p-5 flex-wrap flex-col' >
        {/* <h1 className='text-center text-6xl text-white' >This is video Player</h1> */}

        <div className='w-3/4 m-5' >
            {/* VideoPlayer */}
            <VideoPlayer></VideoPlayer>
        </div>

        <div className='w-3/4'>
            {/* description */}
            <VideoDescription></VideoDescription>
        </div>

    </div>
  )
}

export default VideoPlay