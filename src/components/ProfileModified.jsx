import "./ProfileModified.css";
import React, { useState } from "react";
import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import PassIcon from "../assets/svg/input-password.svg";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  apiAccountPasswordPut,
  apiAtSettingGet,
  apiAtSettingPost,
} from "../api";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import { BiSolidHelpCircle } from "react-icons/bi";

export default function ProfileModified() {
  const [test, setTest] = useState("");
  const [tel, setTel] = useState("");
  const [authTimerId, setAuthTimerId] = useState(0);
  const [authTime, setAuthTime] = useState(60);
  const [showBeforeAuth, setShowBeforeAuth] = useState(true);
  const [showAfterAuth, setShowAfterAuth] = useState(false);
  const [agreeState, setAgreeState] = useState(false); // agreeState를 useState로 변경
  const [resultAuth, setResultAuth] = useState(""); // setResultHint 상태 추가
  const [resultHint, setResultHint] = useState(""); // setResultHint 상태 추가
  const queryClient = useQueryClient();

  const {
    watch,
    setError,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [initialLogin, setInitialLogin] = useState(
    localStorage.getItem("initialLogin")
  );

  // 로컬 스토리지에서 initialLogin 값이 변경되었을 때 감지
  useEffect(() => {
    const loginStatus = localStorage.getItem("initialLogin");
    setInitialLogin(loginStatus);
  }, []);

  // sms 인증
  const startAuthTimer = () => {
    clearInterval(authTimerId); // 이전 타이머 해제

    setAuthTimerId(
      setInterval(() => {
        setAuthTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(authTimerId);
            // 상태 업데이트로 UI 변경
            setResultHint("인증시간이 만료되었습니다. 다시 인증해주세요.");
            setShowAfterAuth(false);
            setShowBeforeAuth(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000)
    );
  };

  if (resultAuth) {
    clearInterval(authTimerId);
  }

  // sms 인증
  console.log(watch("tel"));
  const handleSendAuth = () => {
    if (watch("tel") === "") {
      alert("연락처를 입력해주세요.");
      return;
    }

    // 4자리 랜덤 숫자 생성
    const randomAuthNumber = Math.floor(1000 + Math.random() * 9000);
    setTest(randomAuthNumber);
    // AJAX 호출 대신 fetch 또는 axios 등을 사용하세요.
    // 이 코드는 AJAX 호출을 대체하는 것이 아닙니다.
    // 아래의 URL 및 데이터는 실제로 사용하는 서버에 맞게 수정해야 합니다.
    fetch("/api/Message/send-auth-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ tel: tel, authCode: randomAuthNumber.toString() }), // 휴대폰 번호를 문자열로 서버에 전달
    })
      .then((response) => response.json())
      .then((data) => {
        switch (data.result) {
          case 0:
            // 상태 업데이트로 UI 변경
            setShowAfterAuth(true); // 인증번호 입력란 표시
            setShowBeforeAuth(false); // 본인인증 버튼 숨김
            setAuthTime(60);
            setResultHint("");
            setResultAuth("");
            startAuthTimer(null);

            break;
          case 1:
            alert(data.message);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // sms 인증
  // 확인버튼
  function checkPhoneNumberWithoutHyphen(text) {
    const phonePattern = /(?:\+\d{1,3})?(?:\d{10,11})/g;
    return text.match(phonePattern);
  }

  const handleAuthCheck = () => {
    var checkInputValue = document.getElementById("authCode").value;

    if (!checkPhoneNumberWithoutHyphen(watch("tel"))) {
      alert("올바른 연락처를 입력해주세요.");
      return;
    }

    if (checkInputValue === test.toString()) {
      // console.log("문자 인증 값과 작성한 인증값이 동일함");
      setResultAuth("인증되었습니다.");
      setAgreeState(true); // 본인인증 성공 시 agreeState를 true로 설정
    } else if (agreeState === false) {
      // console.log("문자 인증 값과 작성한 인증값이 동일하지않음");
      alert("인증번호가 다릅니다.");
      // 상태 업데이트로 UI 변경
      setResultAuth("다시 시도해주세요.");
      setShowBeforeAuth(true);
      setAgreeState(false); // 본인인증 실패 시 agreeState를 false로 설정
    } else {
      alert("전화번호 인증을 먼저하셔야 합니다. ");
      return;
    }

    setShowAfterAuth(false); // authTime 숨기기
  };

  // user accountIndex 를 얻기위한
  const { user } = useUser();
  const accountIndex = user?.accountIndex;

  const { mutate: mutatePassword } = useMutation(
    (data) => apiAccountPasswordPut(data, accountIndex),
    {
      onSuccess: (data) => {
        if (data.result === 0) {
          alert("비밀번호가 변경되었습니다.");
          reset();
        }
        if (data.result === -4) {
          alert("비밀번호 변경에 실패하였습니다.");
        }
      },
    }
  );

  function isValidPassword(password) {
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordPattern.test(password);
  }

  const onValid = (data) => {
    if (!isValidPassword(data.newPassword)) {
      setError("newPassword", {
        message:
          "새로운 패스워드는 문자, 숫자, 특수문자 등의 조합으로 8자리 이상의 비밀번호를 사용해야 합니다 ",
      });
      return;
    }
    if (data.nowPassword === data.newPassword) {
      setError("newPassword", {
        message: "새로운 패스워드는 기존의 패스워드와 달라야 합니다. ",
      });
      return;
    }
    if (data.newPassword !== data.newPassword2) {
      setError("newPassword2", {
        message: "패스워드와 패스워드 확인은 같아야 합니다.",
      });
      return;
    }
    if (!resultAuth) {
      alert("전화번호 인증을 먼저 해주셔야 합니다.");
      return;
    }
    mutatePassword(data);
  };

  const { data: dataAtSetting, isLoading } = useQuery(
    ["getAtsetting", accountIndex],
    apiAtSettingGet
  );

  const [isReceivedMon, setIsReceivedMon] = useState();
  const [isReceivedTue, setIsReceivedTue] = useState();
  const [isReceivedWed, setIsReceivedWed] = useState();
  const [isReceivedThu, setIsReceivedThu] = useState();
  const [isReceivedFri, setIsReceivedFri] = useState();
  const [isReceivedSat, setIsReceivedSat] = useState();
  const [isReceivedSun, setIsReceivedSun] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    if (!isLoading) {
      setIsReceivedMon(dataAtSetting?.atSetting?.isReceivedMon);
      setIsReceivedTue(dataAtSetting?.atSetting?.isReceivedTue);
      setIsReceivedWed(dataAtSetting?.atSetting?.isReceivedWed);
      setIsReceivedThu(dataAtSetting?.atSetting?.isReceivedThu);
      setIsReceivedFri(dataAtSetting?.atSetting?.isReceivedFri);
      setIsReceivedSat(dataAtSetting?.atSetting?.isReceivedSat);
      setIsReceivedSun(dataAtSetting?.atSetting?.isReceivedSun);
      setStartTime(dataAtSetting?.atSetting?.startTime);
      setEndTime(dataAtSetting?.atSetting?.endTime);
    }
  }, [dataAtSetting]);

  // console.log("hello", isReceivedFri);

  const { mutate: mutateAlim } = useMutation(
    (data) => apiAtSettingPost(data, accountIndex),
    {
      onSuccess: (data) => {
        if (data.result === 0) {
          queryClient.invalidateQueries("getAtsetting");
          alert("변경되었습니다.");
        }
      },
    }
  );

  const handleSubmitAlim = (e) => {
    e.preventDefault();
    mutateAlim({
      startTime,
      endTime,
      isReceivedMon,
      isReceivedTue,
      isReceivedWed,
      isReceivedThu,
      isReceivedFri,
      isReceivedSat,
      isReceivedSun,
    });
  };

  return (
    <div className="admin-profile">
      <section>
        <div className="reg-title">
          <img src={PassIcon} alt="icon2" />
          <h2>전화번호 인증</h2>
        </div>
        {/* 인증수단 */}
        <VStack spacing={4} w="full" alignItems="flex-start">
          <HStack>
            <Text width="250px">전화번호 인증</Text>
            <Input
              minLength={11}
              maxLength={11}
              className=""
              {...register("tel", {
                required: "전화번호 인증은 필수 항목입니다.",
                pattern: {
                  value: /^\d{10}$|^\d{11}$/,
                  message: "전화번호는 10자 또는 11자이어야 합니다.(-제외)",
                },
              })}
              type="text"
              placeholder="전화번호를 입력해 주세요(-제외)"
              value={tel}
              onChange={(e) => setTel(e.target.value)} // 입력 값이 변경될 때 tel 상태 업데이트
            />

            {/* 본인인증 하기 */}
            <div
              id="before_auth"
              style={{ display: showBeforeAuth ? "block" : "none" }}
            >
              <Button
                colorScheme="green"
                size="sm"
                type="button"
                onClick={handleSendAuth}
              >
                본인인증
              </Button>
            </div>

            <div className="">
              {/* 본인인증 확인 결과 */}
              <p id="result_hint" className="hint-ctf">
                {authTime <= 0 ? (
                  <span>{resultHint}</span>
                ) : (
                  <>
                    <span
                      style={{
                        display:
                          showAfterAuth && authTime >= 0 ? "block" : "none",
                      }}
                    >
                      {authTime}
                    </span>
                    <span style={{ display: authTime <= 0 ? "none" : "block" }}>
                      {resultAuth}
                    </span>
                  </>
                )}
              </p>
            </div>
          </HStack>

          {/* <!--본인인증 번호 입력 및 결과--> */}
          {showAfterAuth && (
            <HStack
              w="full"
              spacing={4}
              id="after_auth"
              style={{ display: 33 ? "block" : "none" }}
            >
              {/* <!--본인인증 정보 입력--> */}
              <Input
                size="sm"
                width="200px"
                className="input-ctf"
                type="text"
                id="authCode"
                placeholder="인증번호 입력"
                maxLength="4"
                inputMode="numeric"
              />
              <Button
                size="sm"
                colorScheme="blue"
                type="button"
                onClick={handleAuthCheck}
              >
                확인
              </Button>
            </HStack>
          )}
        </VStack>
      </section>
      {resultAuth && (
        <form onSubmit={handleSubmit(onValid)}>
          <section>
            <div className="reg-title">
              <img src={PassIcon} alt="icon2" />
              <h2>비밀번호 변경</h2>
            </div>
            <div className="input-group">
              <div>현재비밀번호</div>
              <input
                {...register("nowPassword", {
                  required: "'현재 비밀번호를 입력해 주세요.",
                })}
                type="password"
                placeholder="현재 비밀번호를 입력해 주세요."
              />
            </div>
            <div className="error-style">{errors?.nowPassword?.message}</div>
            <div className="input-group">
              <div>새 비밀번호</div>
              <input
                {...register("newPassword", {
                  required: "'새 비밀번호'를 입력해 주세요.",
                  minLength: {
                    message: "8자 이상으로 설정해야 합니다.",
                    value: 8,
                  },
                })}
                type="password"
                placeholder="새 비밀번호를 입력해 주세요."
              />
            </div>

            <div className="error-style">{errors?.newPassword?.message}</div>
            <div className="input-group">
              <div>새 비밀번호 확인</div>
              <input
                {...register("newPassword2", {
                  required: "'새 비밀번호 확인'을 입력해 주세요.",
                })}
                type="password"
                placeholder="새 비밀번호 확인을 입력해 주세요."
              />
            </div>

            <div className="error-style">{errors?.newPassword2?.message}</div>
          </section>
          <div className="btn-container">
            <Button
              onClick={() => startAuthTimer()}
              mx="2"
              colorScheme="blue"
              variant="outline"
            >
              되돌리기
            </Button>
            <Button type="submit" mx="2" colorScheme="blue">
              변경하기
            </Button>
          </div>
        </form>
      )}
      {/* 알림톡 설정시간 (초기 비밀번호를 가졋으면 알림톡 설정 HTML 랜더링X)*/}
      {initialLogin !== "4" ? (
        <section>
          <form onSubmit={handleSubmitAlim}>
            <div className="reg-title">
              <img src={PassIcon} alt="icon2" />
              <h2>알림톡 설정시간</h2>
            </div>
            <div className="alimtalk-time_container">
              <label>
                <input
                  type="checkbox"
                  name="isReceivedMon"
                  checked={isReceivedMon}
                  onChange={() =>
                    setIsReceivedMon((isReceivedMon) => !isReceivedMon)
                  }
                />
                월
              </label>
              <label>
                <input
                  type="checkbox"
                  name="isReceivedTue"
                  checked={isReceivedTue}
                  onChange={() => setIsReceivedTue((item) => !item)}
                />
                화
              </label>
              <label>
                <input
                  type="checkbox"
                  name="isReceivedWed"
                  checked={isReceivedWed}
                  onChange={() => setIsReceivedWed((item) => !item)}
                />
                수
              </label>
              <label>
                <input
                  type="checkbox"
                  name="isReceivedThu"
                  checked={isReceivedThu}
                  onChange={() => setIsReceivedThu((item) => !item)}
                />
                목
              </label>
              <label>
                <input
                  type="checkbox"
                  name="isReceivedFri"
                  checked={isReceivedFri}
                  onChange={() => setIsReceivedFri((item) => !item)}
                />
                금
              </label>
              <label>
                <input
                  type="checkbox"
                  name="isReceivedSat"
                  checked={isReceivedSat}
                  onChange={() => setIsReceivedSat((item) => !item)}
                />
                토
              </label>
              <label>
                <input
                  type="checkbox"
                  name="isReceivedSun"
                  checked={isReceivedSun}
                  onChange={() => setIsReceivedSun((item) => !item)}
                />
                일
              </label>
            </div>
            <div className="labelClass">
              <label className="" type="datetime-local">
                시작시간
                <input
                  className="date-time"
                  type="time"
                  name="startTime"
                  defaultValue={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </label>
              <label className="" type="datetime-local">
                종료시간
                <input
                  className="date-time"
                  type="time"
                  name="endTime"
                  defaultValue={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </label>
            </div>
            <div className="btn-container">
              <Button mx="2" colorScheme="blue" type="submit">
                설정하기
              </Button>
            </div>
          </form>
        </section>
      ) : null}

      <section>
        <div className="help-container">
          <div className="help-title">
            <span>
              <BiSolidHelpCircle />
            </span>
            <span>도움말</span>
          </div>
          <div class="help-content">
            <p className="help_question">
              Q. 비밀번호를 5번 틀려서 로그인이 안돼요
            </p>
            <p className="help_answer">
              A. 썬코리아 (041-425-2063) 로 문의주세요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
