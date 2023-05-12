import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Buffer from "buffer";
import { setAvatarRoute } from "../utils/ApiRoutes";

const SetAvatar = () => {
  const api = "https://api.dicebear.com/6.x/open-peeps/svg?seed=";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [avatarsLoaded, setAvatarsLoaded] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [buttonText, setButtonText] = useState("Load Avatars");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(()=>{
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    }
  },[])
  const setProfilePicture = async () => {
    if (buttonText === "Load Avatars") {
      setButtonText("Set Profile picture");
    } else {
      if (selectedAvatar === undefined) {
        toast.error("Please select an avatar", toastOptions);
      } else {
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error(
            "Error setting avatar, please try again or later",
            toastOptions
          );
        }
      }
    }
  };
  useEffect(() => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      fetch(`${api}${Math.round(Math.random() * 50)}`)
        .then((data) => data.blob())
        .then((image) => {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            data.push(reader.result);
          });
          reader.readAsDataURL(image);
          if (i === 3) {
            console.log("ok i dont need caching");
            setAvatarsLoaded(true);
          }
        })
        .catch((err) => console.log(err));
    }
    setIsLoading(false);
    setAvatars(data);
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatarsLoaded ? (
              avatars.map((avatar, index) => {
                return (
                  <div
                    key={index}
                    className={`avatar ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={avatar}
                      alt="avatar"
                      key={avatar}
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })
            ) : (
              <Container>
                <img src={loader} alt="loader" className="loader" />
              </Container>
            )}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            {buttonText}
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;
