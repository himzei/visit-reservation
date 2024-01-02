import React, { useState , useEffect } from "react";
import "./Login.css";
import Person from "../assets/svg/person.svg";
import InputPerson from "../assets/svg/person-input.svg";
import InputPassword from "../assets/svg/input-password.svg";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { ipData, login } from "../api";
import { useNavigate } from "react-router-dom";


export default function LogIn() {

  // 로컬 스토리지에서 로그인 시도 횟수를 가져오거나, 없으면 0으로 설정
  const [loginAttempts, setLoginAttempts] = useState(
    parseInt(localStorage.getItem("loginAttempts")) || 0
  );

  const [isAccountLocked, setIsAccountLocked] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit , watch  } = useForm();

  const password = watch("Password"); // 비밀번호 필드를 확인

  // 로그인 시도 횟수가 바뀔 때마다 로컬 스토리지를 업데이트
  useEffect(() => {
    localStorage.setItem("loginAttempts", loginAttempts.toString());
  }, [loginAttempts]);

  const { mutate } = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("visitschool", data.token);
      localStorage.removeItem("loginAttempts"); // 로그인 성공 시 로컬 스토리지에서 실패 횟수 삭제

      // 초기 비밀번호로 로그인할시 경고 문구 작성
      if (password.length === 4) {
        localStorage.setItem("initialLogin", 4); // 비밀번호가 4자리면 스토리지 저장 

        if (window.confirm("초기비밀번호로 로그인 하셨습니다. 비밀번호 변경을 하시겠습니까?")) {
          switch (data.auth) {
            case 0:
              navigate("/admin/profile");
              window.location.reload();
              return;
            case 1:
              navigate("/teacher/profile")
              window.location.reload();
              return;
            case 2:
              navigate("/security/profile")
              window.location.reload();
              return;
            default:
              // 기본적으로 처리할 내용이나 오류 처리 로직을 작성할 수 있습니다.
              console.log("알 수 없는 사용자 권한");
              window.location.reload();
              return;
          }
        }
      }else{
        localStorage.removeItem("initialLogin"); // 비밀번호 길이가 4가 아닐 경우 데이터 삭제

        // data.auth 값에 따른 페이지 리디렉션
        switch (data.auth) {
          case 0:
            navigate("/admin/confirm");
            break;
          case 1:
            navigate("/teacher/today");
            break;
          case 2:
            navigate("/security/today");
            break;
          default:
            // 기본적으로 처리할 내용이나 오류 처리 로직을 작성할 수 있습니다.
            console.log("알 수 없는 사용자 권한");
        }
  
        window.location.reload();
      }
    },
    //
    onError: (error) => {
      if (loginAttempts < 4) {
        setLoginAttempts(loginAttempts + 1);
        alert(`아이디와 비밀번호를 확인해 주세요.`);
      } else {
        alert("비밀번호를 5회 이상 틀렸습니다. 관리자에 문의해주세요.");
      }
      console.log(error);
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
          <input
            {...register("UserId")}
            type="text"
            placeholder="아이디"
            disabled={isAccountLocked}
          />
          <img className="input-icon" src={InputPerson} alt="input person" />
        </div>
        <div className="input-container">
          <input
            {...register("Password")}
            type="password"
            placeholder="비밀번호"
            disabled={isAccountLocked}
          />
          <img
            className="input-icon"
            src={InputPassword}
            alt="input password"
          />
        </div>
      </div>
      {isAccountLocked && (
        <div className="warning">
          비밀번호를 5회이상 틀렸습니다. 관리자에 문의주세요
        </div>
      )}
      {/* button */}
      <button type="submit" className="input-button">
        Login
      </button>
    </form>
  );
}
