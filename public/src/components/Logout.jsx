import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../store/UserSlice";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    dispatch(logout())
    navigate("/login");
  };
  return (
    <Button title="Logout" onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
};
const Button = styled.button`
display:flex;
justify-content:center;
align-items:centerl
padding:0.5rem;
border-radius:.5rem;
background-color:#9a86f3;
border:none;
cursor:pointer;
svg{
    font-size:1.3rem;
    color:#ebe7ff
}
`;
export default Logout;
