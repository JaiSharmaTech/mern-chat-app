import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    messages:[],
    messagesLoaded:false,
}
const messageSlice = createSlice({
    name:"messages",
    initialState,
})

export default messageSlice.reducer