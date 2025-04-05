

const server = "http://localhost:8000/api/v1"
// const server = "https://youtube-full-stack-project-six.vercel.app/api/v1"


export default {
    registerUser : `${server}/users/register`,
    loginUser: `${server}/users/login`,
    LogoutUser:`${server}/users/logout`,
    refreshToken: `${server}/users/refresh-token`,
    changeCurrentPassword: `${server}/users/changeCurrentPassword`,
    getCurrentUser:`${server}/users/getCurrentUser`,
    updateAccountDetails: `${server}/users/updateAccountDetails`,
    updateUserAvatar: `${server}/users/updateUserAvatar`,
    updateUserCoverImage: `${server}/users/updateUserCoverImage`,
    getUserProfile:`${server}/users/getUserChannelProfile`,
    getAnyUser : `${server}/users/getAnyUser`,// send user Id as params "GET"

    // Comment Api

    getComments : `${server}/comments/getComments`,  // send data in params and query
    addComments : `${server}/comments/addComment`,
    updateComment : `${server}/comments/updateComment`,
    deleteComment: `${server}/comments/deleteComment`,

    // video apis

    publishVideo : `${server}/videos/`, // POST for public and GET for getAllVideos
    ChannelStats :` ${server}/dashboard/stats`,// send user Id params
    channelVideos : `${server}/dashboard/videos`,// send user Id params
    videoRecomendations : `${server}/videos/recomendations/12`, // Get request to get recomended vieos
    getVideoById : `${server}/videos`, // send videoId by params GET // delete on delete
    increaseViedoViews : `${server}/videos/increaseViews` , // send videoId by params POST
    updateVideo : `${server}/videos/updateVideo`, // send videoId by params , PATCH method
    searchVideo : `${server}/videos/searchResult`, // send data in body GET
    getWatchHistory : `${server}/videos/getWatchHistory`, //POST , userId as params
   

    // subscription
    getUserSubscribers : `${server}/subscription/getUserChannelSubscribers`, // send channelId as params POST
    toggleSubscription : `${server}/subscription/toggleSubscription`, // send channelId as params POST
    

    // Like 
    checkForLike : `${server}/like/checkForLiked`, // send videoId as params POST
    toggleLike : `${server}/like/toggleLikeVideo` , // send videoId as params POST

}