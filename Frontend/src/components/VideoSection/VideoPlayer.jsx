import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { simpleFetch } from '@/backend/simpleFetch';
import api from '@/backend/api';

const VideoPlayer = ({ width = '100%', height = '500px' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [ videoData , setVideoData] = useState({})

  const {videoId} = useParams()

  // const fetchVideo = async() => {

  //   const response = await simpleFetch({
  //     url : `${api.getVideoById}/${videoId}`,
  //     method : "GET"
  //   })
  //    setVideoData(response.data)

  //   console.log(videoData)

  // }

useEffect(() => {
  
  const fetchVideo = async() => {

    const response = await simpleFetch({
      url : `${api.getVideoById}/${videoId}`,
      method : "GET"
    })
    setVideoData(response.data)
  }

  fetchVideo()
} , [videoId])


  // const onClick = () => {
  //   console.log(videoData)
  // }

  // Toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Volume Control
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
      setVolume(newVolume);
      setIsMuted(newVolume === '0');
    }
  };

  // Progress Bar
  const handleTimeUpdate = () => {
    if (videoRef.current && progressRef.current) {
      const progressPercent = 
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  };

  const handleProgressClick = (e) => {
    if (progressRef.current && videoRef.current) {
      const progressBar = progressRef.current;
      const clickPosition = e.nativeEvent.offsetX;
      const progressBarWidth = progressBar.offsetWidth;
      const newTime = 
        (clickPosition / progressBarWidth) * videoRef.current.duration;
      
      videoRef.current.currentTime = newTime;
    }
  };

  // Fullscreen
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) { // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
        videoRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  // Fullscreen change event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      className="relative bg-black rounded-lg overflow-hidden" 
      style={{ width, height }}
    >
      {/* <button className='bg-white' onClick={onClick}>Click me</button> */}
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoData.videoFile}
        className="w-full h-full "
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        
      />

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex items-center space-x-4">
        {/* Play/Pause Button */}
        <button onClick={togglePlay} className="text-white">
          {isPlaying ? <Pause /> : <Play />}
        </button>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <button onClick={toggleMute} className="text-white">
            {isMuted ? <VolumeX /> : <Volume2 />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Progress Bar */}
        <div 
          ref={progressRef}
          className="flex-grow h-1 bg-gray-300 rounded-lg cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-red-600 rounded-lg" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Fullscreen Button */}
        <button onClick={toggleFullScreen} className="text-white">
          {isFullScreen ? <Minimize /> : <Maximize2 />}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;