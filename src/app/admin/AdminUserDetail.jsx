import "./AdminUserDetail.css";
import React from "react";
import RegIcon1 from "../../assets/svg/person-input.svg";
import { Button, HStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { apiGetVisitSite, apiPutManager } from "../../api";
import useVisitSite from "../../hooks/useVisitSite";
import { useState } from "react";
import { useEffect } from "react";

export default function AdminUserDetail({ selectEdit, onClose }) {
  const queryClient = useQueryClient();

  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const { data: dataVisitSite } = useQuery(
    ["getVisitSite", visitSiteIndex],
    apiGetVisitSite
  );

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
  const { mutate } = useMutation((formData) => apiPutManager(formData), {
    onSuccess: (formData) => {
      if (formData.result === 0) {
        alert("성공");
        onClose();
      }
      queryClient.invalidateQueries("getManager");
    },
  });

  const [placeToVisit1, setPlaceToVisit1] = useState(selectEdit.managePlaceToVisit?.placeToVisitIndex);
  const [placeToVisit2, setPlaceToVisit2] = useState(selectEdit.managePlaceToVisit?.parentPlaceToVisitIndex);
  const [dataChild, setDataChild] = useState([]);

  useEffect(() => {
    if (dataVisitSite) {
      const initialChildData = dataVisitSite.placeToVisits.filter(
        (item) => item.parentIndex === parseInt(placeToVisit2)
      );
      setDataChild(initialChildData);
    }
  }, [dataVisitSite, placeToVisit2]);

  const handlePlaceToVisit1 = (e) => {
    const newPlaceToVisit2 = e.target.value;
    setPlaceToVisit2(newPlaceToVisit2);
  
    // 중분류 데이터 업데이트
    const newChildData = dataVisitSite?.placeToVisits?.filter(
      (item) => item.parentIndex === parseInt(newPlaceToVisit2)
    );
    setDataChild(newChildData);
  
    // 중분류 선택 초기화
    setPlaceToVisit1("");
  };


  const handlePlaceToVisit2 = (e) => {
    setPlaceToVisit1(e.target.value);
  };

  const onSubmit = (formData) => {
    mutate({
      placeToVisit1,
      placeToVisit2,
      ...formData,
    });
  };

  const handleCloseClick = () => {
    onClose();
  };

  const parentSite = dataVisitSite?.placeToVisits?.filter(
    (item) => item.parentIndex === -1
  );

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
              type="hidden"
              value={selectEdit.accountIndex}
              {...register("accountIndex")}
            />
            <input
              type="text"
              defaultValue={selectEdit.name}
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
            <div>방문지 대분류</div>
            <select value={placeToVisit2} onChange={handlePlaceToVisit1}>
              <option value="">선택해주세요</option>
              {parentSite?.map((item, index) => (
                <option key={index} value={item.placeToVisitIndex}>
                  {item.title}
                </option>
              ))}
            </select>
            <span className="form-errors">{errors?.placeToVisit1?.message}</span>
          </div>

          <div className="input-group">
            <div>방문지 중분류</div>
            <select value={placeToVisit1} onChange={handlePlaceToVisit2}>
              <option value="">선택해주세요</option>
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
              defaultValue={selectEdit.tel}
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
            <input type="text" value={selectEdit.userId} disabled />
          </div>
          <div className="input-group" {...register("state")}>
            <div>직책</div>
            <input
              type="text"
              defaultValue={selectEdit.position}
              {...register("position")}
            />
          </div>
          <div className="input-group">
            <div>분류{selectEdit.auth}</div>
            <select {...register("auth")}>
              <option
                className="select-default"
                value={0}
                selected={selectEdit.auth === 0}
              >
                관리자
              </option>
              <option
                className="select-default"
                value={1}
                selected={selectEdit.auth === 1}
              >
                담당자
              </option>
              <option
                className="select-default"
                value={2}
                selected={selectEdit.auth === 2}
              >
                입구관리자
              </option>
            </select>
          </div>
        </section>
        {/* <section>
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
        </section> */}
        <HStack w="full" justifyContent="center" my="4">
          <Button width="100px" onClick={() => handleCloseClick()}>
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
        </HStack>
      </form>
    </div>
  );
}
