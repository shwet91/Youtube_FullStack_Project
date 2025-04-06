import React, { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import Store from '@/components/Store'
import api from '@/backend/api'
import { simpleFetch } from '@/backend/simpleFetch'
import VideoCard from '@/components/Card'
import ChannelVideos from '@/components/VideoSection/ChannelVideos'
import Logout from '@/components/Auth/Logout'
import { useNavigate } from 'react-router-dom'
import UserCard from '@/components/UserCard'
import { Icons } from '@/components/Icons/Icons.jsx'


function Test() {
    const userData = useSelector((state) => state.auth.userData)
   
   const [videos, setVideos] = useState([]);
   const [loading, setLoading] = useState(false);
   const [hasLoggedForCurrentBottom, setHasLoggedForCurrentBottom] = useState(false);
 const navigate = useNavigate()
 const isLoggedIn = useSelector((state) => state.auth.status)

    // useEffect(() => {
    //   const fetchData = async() => {
    //     const response = await simpleFetch({
    //       url : `${api.channelVideos}/${userData._id}`,
    //       method : "GET"
    //     })

    //     // console.log(response)
    //      setVideoData(response.data)
    //   }

    //   fetchData()

    // } , [userData])

    // useEffect(() => {
    //   const recomendedVideo = async() => {
    //     const response = await simpleFetch({
    //       url : api.videoRecomendations,
    //       method : "GET"
    //     })

    //     console.log(response)
    //   }

    //   recomendedVideo()
    // })

    const fetchVideos = async () => {

      if (loading) return; // Prevent duplicate requests
      setLoading(true);
      console.log("started")
    
      try {
        const response = await simpleFetch({
          url: api.videoRecomendations,
          method: 'GET',
        });
    
        setVideos((prevVideos) => [...prevVideos, ...response.data]); // Append new videos
        console.log('Fetched Videos:', response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {

      if(!isLoggedIn){
        navigate("/login")
      }
    
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
    <div className='text-white ' >
        <h1>This is test</h1>
        <h1> the : {userData.fullName}</h1>
      <p>
        {
            JSON.stringify(userData)
        }
      </p>
      <Store></Store>
      <Logout></Logout>
      <div className='border '>
      <Icons.spinner className="mr-2 h-10 w-10 animate-spin" />
       
      {/* <Icons.gitHub className="mr-2 h-4 w-4" /> */}
      </div>
  
      <div className=' border  ' >
        {/* <ChannelVideos videoData = {videoData} channelAvatar={userData.avatar} channelName={userData.fullName} ></ChannelVideos> */}
      </div>

      <div>
      <UserCard></UserCard>
      </div>
    </div>
  )
  }


export default Test