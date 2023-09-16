import React from "react";
import RegIcon1 from "../../assets/svg/person-input.svg";
import RegIcon2 from "../../assets/svg/location-icon.svg";
import { Button } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import useVisitSite from "../../hooks/useVisitSite";
import { adminManagerRegister } from "../../api";

export default function AdminUserWrite({ onClose }) {
  // VISIT SITE INDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const { mutate, data } = useMutation(
    (formData) => adminManagerRegister(formData, visitSiteIndex),
    {
      onSuccess: (data) => {
        if (data.result === 0) {
          handleCloseClick();
        }
      },
    }
  );
  console.log(data);

  if (data?.result === 0) {
    window.location.reload();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const onSubmit = (formData) => {
    console.log(formData);
    mutate(formData);
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className="admin-user-detail">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div className="reg-title">
            <img src={RegIcon1} alt="icon1" />
            <h2>사용자 정보</h2>
          </div>
          <div className="input-group">
            <div>사용자명</div>
            <input
              type="text"
              {...register("name", {
                required: "이름을 입력해 주세요",
                minLength: {
                  value: 2,
                  message: "최소 2글자 이상 입력해주세요",
                },
              })}
            />
            <span className="form-errors">{errors?.name?.message}</span>
          </div>
          <div className="input-group">
            <div>패스워드</div>
            <input
              type="password"
              {...register("password", {
                required: "패스워드를 입력해 주세요",
              })}
            />
            <span className="form-errors">{errors?.password?.message}</span>
          </div>
          <div className="input-group">
            <div>패스워드 확인</div>
            <input
              type="password"
              {...register("password2", {
                required: "이름을 입력해 주세요",
              })}
            />
            <span className="form-errors">
              {watch("password") !== watch("password2")
                ? "패스워드를 일치시켜 주세요"
                : null}
            </span>
          </div>
          <div className="input-group">
            <div>휴대전화번호</div>
            <input
              type="text"
              {...register("tel", {
                required: "모바일 번호를 입력해 주세요",
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: "'-' 없이 숫자만 입력해 주세요",
                },
              })}
            />
            <span className="form-errors">{errors?.tel?.message}</span>
          </div>
          <div className="input-group">
            <div>이메일</div>
            <input
              type="text"
              {...register("email", {
                required: "이메일을 입력해 주세요",
                pattern: {
                  value:
                    /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i,
                  message: "이메일 형식으로 입력해 주세요",
                },
              })}
            />
            <span className="form-errors">{errors?.email?.message}</span>
          </div>
          <div className="input-group" {...register("position")}>
            <div>직책</div>
            <input type="text" {...register("position")} />
          </div>
          <div className="input-group">
            <div>분류</div>
            <select {...register("auth")}>
              <option className="select-default" value={0}>
                관리자
              </option>
              <option className="select-default" value={1}>
                담당자
              </option>
              <option className="select-default" value={3}>
                입구관리자
              </option>
            </select>
          </div>
        </section>
        <section>
          <div className="reg-title">
            <img src={RegIcon2} alt="icon2" />
            <h2>비밀번호 초기화</h2>
          </div>
          <div>
            <Button
              height="35px"
              color="white"
              bg="#0066FF"
              _hover={{ bg: "#0053CF" }}
              mx="2"
            >
              초기화 하기
            </Button>
          </div>
          <div>
            <Button onClick={() => handleCloseClick()} width="100px">
              닫기
            </Button>
            <Button
              type="submit"
              width="100px"
              height="35px"
              color="white"
              bg="#0066FF"
              _hover={{ bg: "#0053CF" }}
              mx="2"
            >
              저장
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
}
