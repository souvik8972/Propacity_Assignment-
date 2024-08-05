import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import folderSlice from '../features/Folder/folderSlice'

export const store = configureStore({
    reducer: {
        auth:authSlice,
        folders:folderSlice
    },
})