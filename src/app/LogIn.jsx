import React from "react";
import "./Login.css";
import Person from "../assets/svg/person.svg";
import InputPerson from "../assets/svg/person-input.svg";
import InputPassword from "../assets/svg/input-password.svg";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { ipData, login } from "../api";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { mutate } = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("visitschool", data.token);
      if (data.auth === 0) {
        navigate("/admin/confirm");
      } else if (data.auth === 1) {
        navigate("/teacher/today");
      } else if (data.auth === 2) {
        navigate("/security/today");
      }

      console.log(data);
      window.location.reload();
    },
    //
    onError: (error) => {
      // 로그인 실패 시 경고창 표시
      alert("아이디와 비밀번호를 확인해 주세요.");
      console.error("로그인 오류:", error);
    },
  });

  const { data: getIpData } = useQuery("ipData", ipData);

  const onSubmit = ({ UserId, Password }) => {
    const ip = getIpData?.IPv4;
    mutate({ UserId, Password, ip });
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
          <input
            {...register("Password")}
            type="password"
            placeholder="비밀번호"
          />
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
