
import VideoCard from '@/components/Card'
import { useSelector } from 'react-redux';

function SearchResult() {

const videos = useSelector((state) => state.searchResult.searchResult) 


  return (
    <div className='w-full h-full bg-slate-900 '>



<div className="flex flex-wrap justify-between gap-4">


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



      </div>
  )
}

export default SearchResult