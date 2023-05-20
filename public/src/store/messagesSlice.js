import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessageRoute, getMessageRoute } from "../utils/ApiRoutes";
import axios from "axios"
const initialState = {
    messages: [],
    messagesLoaded: "idle",
    err: null,
}

export const sendMessage = createAsyncThunk('message/sendMessage', async (msg) => {
    const { data } = await axios.post(sendMessageRoute, msg)
    return [data, msg];
})

export const getMessages = createAsyncThunk('message/getMessage', async (userIds) => {
    const { data } = await axios.post(getMessageRoute, userIds);
    return data;
})

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage(state, action) {
            state.messages.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.pending, (state, action) => {
            state.messagesLoaded = "loading"
        })
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
            state.messagesLoaded = "loaded"
        })
        builder.addCase(getMessages.rejected, (state, action) => {
            state.err = action.error
            state.messagesLoaded = "error"
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            if (action.payload[0].status) {
                state.messages.push({
                    fromSelf:true,
                    message:action.payload[1].message,
                })
            } else {
                state.err = action.payload[0].msg;
            }
        })
    }
})
export const getAllMessages = state=>state.message.messages;
export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer
