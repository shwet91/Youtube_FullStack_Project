import React from 'react';
import { Clock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ 
  thumbnail = "https://images.unsplash.com/photo-1742943679521-f4736500a471?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
  title = "Video Title Goes Here",
  views = "1.2M",
  duration = "10:45",
  uploadedAt = "2 weeks ago",
  channelName = "Channel Name",
  channelAvatar = 'https://plus.unsplash.com/premium_photo-1742202420319-e933c71d4495?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8',
  videoId = ""

}) => {

  const navigate = useNavigate()

  const onClick = () => {
     console.log("clicked")
     navigate(`/videoPlayer/${videoId}`)
  }

  return (
    <div className="sm:w-80 bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"  onClick={onClick}  >
      {/* Thumbnail with duration */}
      <div className=" overflow-hidden bg-cover relative h-48  ">
        <img 
           src={thumbnail} 
          // src='https://images.unsplash.com/photo-1742943679521-f4736500a471?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8'
          alt={title}
          className="w-full absolute inset-0 h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm font-medium px-2 py-1 rounded">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {duration}
          </span>
        </div>
      </div>
      
      {/* Video info */}
      <div className="p-2 h-1/4 ">
        <div className="flex gap-1">
          {/* Channel avatar */}
          <div className="flex-shrink-0">
            <img 
              src={channelAvatar} 
              // src='https://plus.unsplash.com/premium_photo-1742202420319-e933c71d4495?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8'
              alt={channelName}
              className="w-10 h-10 rounded-full"
            />
          </div>
          
          {/* Video details */}
          <div className="flex-1">
            <h3 className="text-white h-16 font-medium line-clamp-2 text-m">
              {title}
            </h3>
            <p className="text-gray-400 text-sm m-0">
              {channelName}
            </p>
            <div className="flex items-center text-gray-400 text-[10px] mt-0">
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {views} views
              </span>
              <span className="mx-1">•</span>
              <span>{uploadedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;