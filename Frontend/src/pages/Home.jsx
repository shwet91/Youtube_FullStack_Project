import React, { useEffect } from 'react'
import VideoCard from '@/components/Card'
import { useState } from 'react'
import { simpleFetch } from '@/backend/simpleFetch'
import api from '@/backend/api'
import { Icons } from "@/components/Icons.jsx"

function Home() {


const [videos, setVideos] = useState([]);
const [loading, setLoading] = useState(false);
const [hasLoggedForCurrentBottom, setHasLoggedForCurrentBottom] = useState(false);

// Fetch data function
const fetchVideos = async () => {
  if (loading) return; // Prevent duplicate requests
  setLoading(true);

  try {
    const response = await simpleFetch({
      url: api.videoRecomendations,
      method: 'GET',
    });

    let anotherResponse;
    await Promise.all( response.data.map(async (e ) => {
         anotherResponse = await simpleFetch({
         url : `${api.getAnyUser}/${e.owner}`,
         method : "GET"
    });
     e.avatar = anotherResponse.data.avatar
    e.channelName = anotherResponse.data.fullName
    }))


    setVideos((prevVideos) => [...prevVideos, ...response.data]); // Append new videos
    console.log('Fetched Videos:', response.data);
  } catch (error) {
    console.error('Error fetching videos:', error);
  } finally {
    setLoading(false);
  }
};


useEffect(() => {

  fetchVideos()
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (!hasLoggedForCurrentBottom) {
        fetchVideos();
        setHasLoggedForCurrentBottom(true);
      }
    } else {
      setHasLoggedForCurrentBottom(false);
    } 
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [hasLoggedForCurrentBottom]);

 


  return (
    <div className='w-full h-full bg-slate-900 '>
      
    <div className="flex flex-wrap justify-between gap-4 ">


      {
        Array.from(videos).map((e ) => {
           return <VideoCard
            thumbnail={e.thumbnail}
            title={e.title}
            views={e.views}
            duration={e.duration}
            uploadedAt={e.uploadedAt}
            channelName={e.channelName}
            channelAvatar={e.avatar}
            videoId = {e._id}
             ></VideoCard>

        })
      }
  </div>
  <div className=' flex justify-center '>
    {
      loading ? <Icons.spinner className="mr-2 h-10 w-10 animate-spin text-white" /> : null
    }

  </div>


  </div>
  )
}

export default Home