import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : {} , 
    refreshToken : "",
    accessToken : ""
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : (state , action) => {
            state.status = true,
            state.refreshToken = action.payload.refreshToken
            state.accessToken = action.payload.accessToken
            state.userData = action.payload.data 
        },
        logout : (state) => {
            state.status = false,
            state.userData = {}
        },
        changeCoverImage : (state , action) => {
            state.userData.coverImage = action.payload.coverImage
        },
        changeAvatar : (state , action) => {
            state.userData.avatar = action.payload.avatar
        },
        changeDetails : (state , action) => {
            state.userData.fullName = action.payload.fullName,
            state.userData.username = action.payload.username,
            state.userData.email = action.payload.email
        }
    }
})

export const { login , logout , changeCoverImage , changeAvatar , changeDetails } = authSlice.actions
export default authSlice.reducer;