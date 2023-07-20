import {configureStore,combineReducers,getDefaultMiddleware} from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'


const reducers = combineReducers({
    user: userSlice
})

export const store = configureStore({
    reducer: reducers
})