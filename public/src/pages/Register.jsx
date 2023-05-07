import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerROute } from "../utils/ApiRoutes";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleValidation = () => {
    const { password, cpassword, username, email } = formData;
    if (password !== cpassword)
      return {
        stat: false,
        message: "password and confirm password should be same",
      };
    if (username.length < 3)
      return {
        stat: false,
        message: "Username should be greater than 3 characters",
      };
    if (password.length < 8)
      return {
        stat: false,
        message: "Password should be greater or equal to 8 characters",
      };
    if (email == "") return { stat: false, message: "Email is required" };
    return { stat: false };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { stat, message } = handleValidation();
    if (!stat) {
      toast.error(message, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else if (stat) {
      const { password, cpassword, username, email } = formData;
      const { data } = await axios.post(registerROute, {
        username,
        email,
        password,
      });
    }
  };

  const handleChange = (e) => {
    setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };
  return (
    <React.Fragment>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={logo} alt="" />
            <h1>Snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            onChange={handleChange}
          />
          <button type="submit">Create User</button>
          <span>
            already have an account ? <Link to={"/login"}>Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </React.Fragment>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
