import React, { useState , useEffect } from 'react'
import { Camera, Settings, Watch } from 'lucide-react'

import UpdateUserDetails from '@/components/UserSettings/UpdateUserDetails'
import ChangeAvatar from '@/components/UserSettings/ChangeAvatar'
import ChangeCoverImage from '@/components/UserSettings/ChangeCoverImage'
import ChangePassword from '@/components/UserSettings/ChangePassword'
import ChannelVideos from '@/components/VideoSection/ChannelVideos'
import {  useParams } from 'react-router-dom'


// fetching
import { simpleFetch } from '@/backend/simpleFetch'
import api from '@/backend/api'

function OthersProfile() {
  const [activeTab, setActiveTab] = useState('Videos')
  const [bio] = useState('Content creator | Tech Enthusiast | Sharing my journey')
  const [stats , setStats] = useState({})

  const [videoData , setVideoData] = useState([])

    const { userId } = useParams()
    const [ownerData , setOwnerData] = useState({})



  // fetching stats
  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await simpleFetch({
          url: `${api.ChannelStats}/${userId}`,
          method: "GET",
        });
        console.log(response.data)
        setStats(response.data);

        const fetchUser = await simpleFetch({
            url : `${api.getAnyUser}/${userId}`,
            method : "GET"
        })

        setOwnerData(fetchUser.data)
        console.log(fetchUser.data)
      } catch (error) {
        console.error("Error fetching channel stats:", error);
      }
    };
  
    fetchData();
  }, [userId]); // Ensure userId is included instead of userData
  

    // fetching channel videos 
        useEffect(() => {
          const fetchData = async() => {
            const response = await simpleFetch({
              url : `${api.channelVideos}/${userId}`,
              method : "GET"
            })
             setVideoData(response.data)

          }

          fetchData()
    
        } , [userId])


  const renderTabContent = () => {
    switch(activeTab) {
      
        case 'Videos':
          return (
            <div className="mt-6 space-y-4 text-neutral-300">
               <ChannelVideos videoData = {videoData} channelAvatar={ownerData.avatar} channelName={ownerData.fullName} ></ChannelVideos>
            </div>
          )
      default:
        return <div className="mt-6 text-neutral-400">Under Construction</div>
    }
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* <button onClick={() => console.log(watchHistory)}>Click me</button> */}
      {/* Cover Photo Section */}
      <div className="relative h-48 sm:h-64 bg-neutral-900">
        <img 
          src={ownerData.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover opacity-70"
        />
        <button className="absolute bottom-4 right-4 bg-black/60 p-2 rounded-full hover:bg-black/80 transition-colors">
          <Camera className="text-white" size={24} />
        </button>
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 -mt-16 sm:-mt-20 relative">
        <div className="  flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-black overflow-hidden">
              <img 
                src={ownerData.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              {/* <button onClick={() => setUpdateCoverImage((prev) => !prev)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Camera  className="text-white" size={32} />
              </button> */}
            </div>
          </div>

          {/* Profile Info */}
          <div className="  text-center sm:text-left flex-grow">
            <h1 className="text-2xl sm:text-3xl font-bold">{ownerData.fullName}</h1>
            <p className="text-neutral-400 text-sm">@{ownerData.fullName}</p>
            <div className="text-neutral-300 text-sm mt-2">
              {bio}
            </div>
          </div>

          {/* Profile Actions */}
          {/* {
              updateAvatar ?  <div className='bg-red-800 w-full' > </div>  : null
            } */}

        </div>

        <div className=' m-auto w-1/2' >
        {/* <UpdateUserDetails></UpdateUserDetails> */}
        {/* <ChangeAvatar></ChangeAvatar> */}
        {/* <ChangeCoverImage></ChangeCoverImage> */}

        </div>

        {/* Stats */}
        <div className="  mt-6 flex justify-center sm:justify-start space-x-6 text-neutral-400">
          <div className="text-center">
            <p className="text-white font-bold text-lg">{stats.totalSubscribers}</p>
            <p className="text-sm">Subscribers</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">{stats.totalViews}</p>
            <p className="text-sm">Total Views</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">{stats.totalVideos}</p>
            <p className="text-sm">Videos</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">{stats.totalLikes}</p>
            <p className="text-sm">Total Likes</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className=" border mt-8 -b border-neutral-800">
          <nav className="flex space-x-6 justify-center sm:justify-start">
            {['Videos'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`
                  text-neutral-400 hover:text-white pb-3 
                  ${activeTab === tab 
                    ? 'border-b-2 border-white text-white' 
                    : 'border-b-2 border-transparent'}
                  transition-colors
                `}
              >
                {tab === 'Watch History' ? (
                  <span className="flex items-center">
                    <Watch size={16} className="mr-2" /> Watch History
                  </span>
                ) : (
                  tab
                )}
              </button>
            ))}

             {/* {['Videos'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`
                  text-neutral-400 hover:text-white pb-3 
                  ${activeTab === tab 
                    ? 'border-b-2 border-white text-white' 
                    : 'border-b-2 border-transparent'}
                  transition-colors
                `}
              >
                {tab === 'Watch History' ? (
                  <span className="flex items-center">
                    <Watch size={16} className="mr-2" /> Watch History
                  </span>
                ) : (
                  tab
                )}
              </button>
            ))} */}
          </nav>
        </div>

        {/* Tab Content */}
        <div className=''>
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default OthersProfile