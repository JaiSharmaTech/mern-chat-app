import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    currentUser:JSON.parse(localStorage.getItem("chat-app-user")) || null,
    currentChat:{},
    chatUsers:[],
    loadedChatUsers:false,
}
const usersSlice = createSlice({
    name:"user",
    initialState
})

export default usersSlice.reducer