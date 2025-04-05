import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"

import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import SearchReducer from "./searchSlice"



const persisitConfig = {
    key: "root",
    storage
}

const myReducer = combineReducers({
    auth : authReducer,
    searchResult : SearchReducer
})

const persistedReducer = persistReducer(persisitConfig , myReducer)

const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Required for Redux Persist
        }),
})




 export const persistor = persistStore(store)

export default store