import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { allUsersRoute, host } from "../utils/ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentsUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("chat-app-user");
    if (!user) {
      navigate("/login");
    } else {
      setCurrentsUser(JSON.parse(user));
    }
  }, []);
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        axios.get(`${allUsersRoute}/${currentUser._id}`).then(({ data }) => {
          setContacts(data);
        });
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);
  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {currentChat === undefined ? (
            <Welcome user={currentUser} />
          ) : (
            <ChatContainer
            socket={socket}
              currentUser={currentUser}
              currentChat={currentChat}
            />
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
