import React from "react";
import "./Login.css";
import Person from "../assets/svg/person.svg";
import InputPerson from "../assets/svg/person-input.svg";
import InputPassword from "../assets/svg/input-password.svg";

export default function LogIn() {
  return (
    <div className="login-container">
      <h1>로그인</h1>
      <div className="login-image">
        <img src={Person} alt="person" />
      </div>
      <div className="login-input">
        <div className="input-container">
          <input type="text" placeholder="아이디" />
          <img className="input-icon" src={InputPerson} alt="input person" />
        </div>
        <div className="input-container">
          <input type="text" placeholder="비밀번호" />
          <img
            className="input-icon"
            src={InputPassword}
            alt="input password"
          />
        </div>
      </div>
      {/* button */}
      <div className="input-button">Login</div>
    </div>
  );
}
