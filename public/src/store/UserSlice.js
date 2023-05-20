import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allUsersRoute } from "../utils/ApiRoutes";
import axios from "axios"
const initialState = {
    currentUser: JSON.parse(localStorage.getItem("chat-app-user")) || null,
    currentChat: null,
    chatUsers: [],
    loadedChatUsers: "loading",
    error: null,
}

export const fetchChatUsers = createAsyncThunk('user/fetchChatUsers', async (userId) => {
    const { data } = await axios.get(`${allUsersRoute}/${userId}`);
    return data;
})

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentChat(state, action) {
            state.currentChat = state.chatUsers[action.payload]
        },
        logout(state){
            state.currentUser = null;
        },
        setUser(state, action){
            state.currentUser = action.payload;
            localStorage.setItem('chat-app-user',JSON.stringify(action.payload))
        },
        updateUser(state, action){
            const newUser = {...state, ...action.payload}
            state.currentUser = newUser;
            localStorage.setItem('chat-app-user',JSON.stringify(newUser))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChatUsers.fulfilled, (state, action) => {
            state.chatUsers = action.payload
            state.loadedChatUsers = "loaded"
        })
        builder.addCase(fetchChatUsers.rejected, (state, action) => {
            state.loadedChatUsers = "error"
            state.error = action.error
        })
    }
})
export const { setCurrentChat, logout, setUser, updateUser } = usersSlice.actions;
export const getContacts = (state) => state.user.chatUsers;
export const getCurrentChat = state => state.user.currentChat;
export const getUser = state => state.user.currentUser;
export const getError = state => state.user.error;
export const getStatus = state => state.user.loadedChatUsers;
export default usersSlice.reducer
