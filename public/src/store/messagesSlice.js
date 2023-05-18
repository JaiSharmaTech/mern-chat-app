import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    messages: [],
    messagesLoaded: false,
}
const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage(state, action) {
            state.push({
                fromSelf: true,
                message: action.payload,
            })
        }
    }
})

export default messageSlice.reducer