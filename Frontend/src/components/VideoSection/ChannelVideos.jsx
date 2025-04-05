import React from 'react'
import VideoCard from '../Card'

function ChannelVideos({ videoData = {} , channelAvatar ="" , channelName = "" }) {


  return (
    <div className=' p-6  flex gap-5 flex-wrap '>
     
     {
        videoData.map((e , i) => <VideoCard
         key={i}
         thumbnail={e.thumbnail}
         title={e.title}
         views={e.views}
         duration={e.duration}
         uploadedAt={e.createdAt}
         channelAvatar={channelAvatar}
         channelName={channelName}
          ></VideoCard> )
     }

    </div>
  )
}

export default ChannelVideos