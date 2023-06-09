import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentChat, getUser } from "../store/UserSlice";
import {
  getMessages,
  addMessage,
  getAllMessages,
  sendMessage,
} from "../store/messagesSlice";
const ChatContainer = ({ socket }) => {
  const messages = useSelector(getAllMessages);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const currentUser = useSelector(getUser);
  const currentChat = useSelector(getCurrentChat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessages({ from: currentUser._id, to: currentChat._id }));
  }, [currentChat]);
  const handleSubmit = async (message) => {
    dispatch(
      sendMessage({ from: currentUser?._id, to: currentChat?._id, message })
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message,
    });
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieved", (message) => {
        setArrivalMessage({ fromSelf: false, message });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && dispatch(addMessage(arrivalMessage));
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={currentChat.avatarImage} alt="userAvatar" />
          </div>
          <div className="username">
            <h3>{currentChat.username} </h3>
          </div>
          <Logout />
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-input">
        <ChatInput handleSendMessage={handleSubmit} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer;
