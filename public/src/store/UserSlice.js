import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allUsersRoute } from "../utils/ApiRoutes";
import axios from "axios"
const initialState = {
    currentUser:JSON.parse(localStorage.getItem("chat-app-user")) || null,
    currentChat:{},
    chatUsers:[],
    loadedChatUsers:"loading",
    error:null,
}

export const fetchChatUsers = createAsyncThunk('user/fetchChatUsers',async(userId)=>{
    const {data} = await axios.get(`${allUsersRoute}/${userId}`);
    return data;
})

const usersSlice = createSlice({
    name:"user",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchChatUsers.fulfilled,(state, action)=>{
            state.chatUsers = action.payload
            state.loadedChatUsers = "loaded"
        })
        builder.addCase(fetchChatUsers.rejected,(state, action)=>{
            state.loadedChatUsers = "error"
            state.error = action.error
        })
    }
})

export default usersSlice.reducer