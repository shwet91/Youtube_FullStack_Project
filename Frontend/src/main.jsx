import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store'
import { Provider } from 'react-redux'
import Layout from './Layout'
import Home from './pages/Home'
import Signup from './pages/Signup'
import VideoPlay from './pages/VideoPlay'
import YouTubeProfile from './pages/Profile'
import PublishVideo from './pages/PublishVideo'
import Test from './pages/Test'
import EditVideoPage from './pages/EditVideoPage'
import UploadVideo from './pages/Test2'
import SearchResult from './pages/SearchResult'
import OthersProfile from './pages/othersProfile'

import { persistor} from "./store/store"
import { PersistGate } from 'redux-persist/integration/react'


import { RouterProvider , createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/signup",
        element: <Signup></Signup>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/videoPlayer/:videoId",
        element:  <VideoPlay></VideoPlay>
      },
      {
        path: "/profile",
        element: <YouTubeProfile></YouTubeProfile>
      },
      {
        path: "/uploadVideo",
        element: <PublishVideo></PublishVideo>
      },
      {
        path: "/editVideo/:videoId",
        element: <EditVideoPage></EditVideoPage>
      },
      {
        path: "/test2/:videoId",
        element: <UploadVideo></UploadVideo>
      },
      {
        path: "/searchResult",
        element: <SearchResult></SearchResult>
      },
      {
        path: "/othersProfile/:userId",
        element: <OthersProfile></OthersProfile>
      }
    ]
  },
  {
    path: "/test",
    element: <Test></Test>
  }
])


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
      <RouterProvider router={router} ></RouterProvider>
      </PersistGate>

    </Provider>

  //  </StrictMode>,
)
