import React from "react";
import "./Login.css";
import Person from "../assets/svg/person.svg";
import InputPerson from "../assets/svg/person-input.svg";
import InputPassword from "../assets/svg/input-password.svg";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { login } from "../api";

export default function LogIn() {
  const { register, handleSubmit } = useForm();
  const { mutate, data: apiData } = useMutation(login);
  console.log(apiData);

  const onSubmit = ({ UserId, Password }) => {
    const encoder = new TextEncoder();
    const utf8Array2 = encoder.encode(Password);
    const binaryString2 = String.fromCharCode.apply(null, utf8Array2);
    const password = btoa(binaryString2);
    console.log(password);
    mutate({ UserId, password });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-container">
      <h1>로그인</h1>
      <div className="login-image">
        <img src={Person} alt="person" />
      </div>
      <div className="login-input">
        <div className="input-container">
          <input {...register("UserId")} type="text" placeholder="아이디" />
          <img className="input-icon" src={InputPerson} alt="input person" />
        </div>
        <div className="input-container">
          <input {...register("Password")} type="text" placeholder="비밀번호" />
          <img
            className="input-icon"
            src={InputPassword}
            alt="input password"
          />
        </div>
      </div>
      {/* button */}
      <button type="submit" className="input-button">
        Login
      </button>
    </form>
  );
}
