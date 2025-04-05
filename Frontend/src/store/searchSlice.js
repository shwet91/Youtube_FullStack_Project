import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    searched : false,
    searchResult : []
}

const searchSlice = createSlice({
    name : "searchResult",
    initialState,
    reducers : {
        addResult : (state , action) => {
          state.searchResult = action.payload.result,
          state.searched = true
        },
        removeResult : (state) => {
            state.searchResult = [] ,
            state.searched = false
        }
    }
})

export const { addResult , removeResult} = searchSlice.actions
export default searchSlice.reducer;