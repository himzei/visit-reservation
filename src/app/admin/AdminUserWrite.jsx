//
// 사용자 관리 페이지
// 글쓰기
import "./AdminUserWrite.css";
import React from "react";
import RegIcon1 from "../../assets/svg/person-input.svg";
import { Button } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import useVisitSite from "../../hooks/useVisitSite";
import {
  adminManagerRegister,
  apiGetVisitSite,
  managePlaceToVisitPost,
} from "../../api";
import { useState } from "react";

export default function AdminUserWrite({ onClose }) {
  // VISIT SITE INDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  // input box 관리
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const { mutate: manageMutate } = useMutation(
    (data) => managePlaceToVisitPost(data),
    {
      onSuccess: (data) => {
        if (data.result === 0) {
          alert("성공");
        }
      },
    }
  );

  // useMutation
  // 등록하기
  const { mutate } = useMutation(
    (formData) => adminManagerRegister(formData, visitSiteIndex),
    {
      onSuccess: (data) => {
        if (data.result === 0) {
          const accountIndex = data.accountIndex;
          manageMutate({
            accountIndex,
            parentPlaceToVisitIndex: watch("placeToVisit2"),
            placeToVisitIndex: watch("placeToVisit1"),
          });
          handleCloseClick();
          window.location.reload();
        }
      },
    }
  );

  // if (data?.result === 0) {
  //   window.location.reload();
  // }

  const onSubmit = (formData) => {
    mutate(formData);
  };

  const handleCloseClick = () => {
    onClose();
  };

  const [dataChild, setDataChild] = useState();

  // 방문지 불러오기
  const { data: dataVisitSite } = useQuery(
    ["getVisitSite", visitSiteIndex],
    apiGetVisitSite
  );

  const parentSite = dataVisitSite?.placeToVisits?.filter(
    (item) => item.parentIndex === -1
  );

  const handleSiteChange = (e) => {
    const title = e.target.value;
    saveChildData(title);
  };

  const saveChildData = (placeToVisitIndex) => {
    const childSite = dataVisitSite?.placeToVisits?.filter(
      (item) => item.parentIndex === parseInt(placeToVisitIndex)
    );
    setDataChild(childSite);
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
          {/* 방문지 */}
          <div className="input-group" onChange={handleSiteChange}>
            <div>방문지1</div>
            <select {...register("placeToVisit1")}>
              <option>선택해주세요</option>
              {parentSite?.map((item, index) => (
                <option key={index} value={item.placeToVisitIndex}>
                  {item.title}
                </option>
              ))}
            </select>
            <span className="form-errors">
              {errors?.placeToVisit1?.message}
            </span>
          </div>
          <div className="input-group">
            <div>방문지2</div>
            <select {...register("placeToVisit2")}>
              <option>선택해주세요</option>
              {dataChild?.map((item, index) => (
                <option key={index} value={item.placeToVisitIndex}>
                  {item.title}
                </option>
              ))}
            </select>
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
            <div>패스워드</div>
            <input
              type="text"
              defaultValue={
                watch("tel")?.length >= 11 ? watch("tel")?.slice(-4) : null
              }
            />
            <span className="form-errors">{errors?.password?.message}</span>
          </div>

          <div className="input-group">
            <div>이메일</div>
            <input
              type="text"
              {...register("email", {
                required: "이메일을 입력해 주세요",
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
            <select {...register("auth", { required: true })}>
              {/* 관리자가 관리자를 생성못함 */}
              {/* <option className="select-default" value={0}>
                관리자
              </option> */}
              <option className="select-default">선택하세요</option>
              <option className="select-default" value={1}>
                담당자
              </option>
              <option className="select-default" value={2}>
                지킴이실
              </option>
            </select>
          </div>
        </section>
        <section>
          <div className="button-container">
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
