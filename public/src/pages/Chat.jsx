import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { host } from "../utils/ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatUsers, getCurrentChat, getUser } from "../store/UserSlice";

const Chat = () => {
  const socket = useRef();
  const dispatch = useDispatch();
  const currentUser = useSelector(getUser)
  const currentChat = useSelector(getCurrentChat)
  const navigate = useNavigate();
  useEffect(() => {
    if(!currentUser){
      navigate("/login")
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        dispatch(fetchChatUsers(currentUser._id))
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);
  return (
    <>
      <Container>
        <div className="container">
          <Contacts />
          {!currentChat ? (
            <Welcome />
          ) : (
            <ChatContainer socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
