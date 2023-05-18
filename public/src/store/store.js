import {configureStore} from "@reduxjs/toolkit"
import usersSlice from './UserSlice'
import messagesSlice from "./messagesSlice"
const store = configureStore({
    reducer:{
        user:usersSlice,
        message:messagesSlice,
    }
})

export default store