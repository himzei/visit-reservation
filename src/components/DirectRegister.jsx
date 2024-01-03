import "./DirectRegister.css";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { divideDate } from "../utils/divideDate";
import RegIcon2 from "../assets/svg/security-register2.svg";
import RegIcon3 from "../assets/svg/security-register3.svg";
import { Button, Spinner } from "@chakra-ui/react";
import {
  apiGetPurposeOfVisit,
  apiGetVisitSite,
  apiVisitReservationRegister,
} from "../api";
import useVisitSite from "../hooks/useVisitSite";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function DirectRegister() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [dataChild, setDataChild] = useState();

  // 방문목적 불러오기
  const { data: dataPurposeOfVisits } = useQuery(
    ["getPurposeOfVisit", visitSiteIndex],
    apiGetPurposeOfVisit
  );

  const orderedPurposeOfVisit = dataPurposeOfVisits?.purposeOfVisits?.sort(
    (a, b) => parseInt(a?.itemOrder) - parseInt(b?.itemOrder) || 1
  );
  // 방문지 불러오기
  const { data: dataVisitSite } = useQuery(
    ["getVisitSite", visitSiteIndex],
    apiGetVisitSite
  );

  const parentSite = dataVisitSite?.placeToVisits?.filter(
    (item) => item.parentIndex === -1
  );

  const {
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { isLoading, mutate } = useMutation(
    (formData) => apiVisitReservationRegister(visitSiteIndex, formData),
    {
      onSuccess: () => {
        toast.success("등록되었습니다!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset();
      },
    }
  );

  const [password, setPassword] = useState("");

  const onChange = (e) => {
    const temp = e.target.value;
    if (temp.length >= 11) {
      setPassword(temp.slice(-4));
    }
  };

  const onSubmit = (formData) => {
    const reservationDate = divideDate(formData.date, formData.time);
    const placeToVisit = formData.placeToVisit1 + " " + formData.placeToVisit2;
    mutate([reservationDate, { placeToVisit, password, ...formData }]);
  };

  const handleSiteChange = (e) => {
    const title = e.target.value;
    // console.log(typeof title);

    saveChildData(title);
  };

  const saveChildData = (title) => {
    if (title !== "") {
      const { placeToVisitIndex } = parentSite.find(
        (item) => item.title === title
      );
      const childSite = dataVisitSite?.placeToVisits
        ?.filter((item) => item.parentIndex === parseInt(placeToVisitIndex))
        .sort((a, b) => parseInt(a?.itemOrder) - parseInt(b?.itemOrder) || 1);
      setDataChild(childSite);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="admin-register">
          <input type="hidden" value={1} {...register("type")} />
          <input type="hidden" value="" {...register("code")} />

          <section>
            <div className="reg-title">
              <img src={RegIcon2} alt="icon2" />
              <h2>방문객 정보</h2>
            </div>
            <div className="input-group">
              <div>방문객명</div>
              <input
                {...register("name", {
                  required: "이름을 입력해 주세요",
                  minLength: {
                    value: 2,
                    message: "최소 2글자 이상 입력해주세요",
                  },
                  pattern: {
                    value: /^[a-zA-Z가-힣\s]+$/, // 영문자, 한글, 공백만 허용하는 정규식
                    message: "특수문자는 입력할 수 없습니다",
                  },
                })}
                type="text"
                placeholder="성함을 입력해 주세요."
              />
              <span className="form-errors">{errors?.name?.message}</span>
              <span className="form-errors">{errors?.name?.message}</span>
            </div>
            <div className="input-group">
              <div>휴대전화번호</div>
              <input
                {...register("tel", {
                  required: "모바일 번호를 입력해 주세요",
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "'-' 없이 숫자만 입력해 주세요",
                  },
                  minLength: {
                    value: 11,
                    message: "최소 11글자 이상 입력해주세요",
                  },
                  maxLength: {
                    value: 11,
                    message: "최대 11글자 입력해주세요",
                  },
                })}
                onChange={onChange}
                type="text"
                placeholder="휴대전화번호를 입력해 주세요."
              />
              <span className="form-errors">{errors?.tel?.message}</span>
            </div>
            <div className="input-group">
              <div>차량번호</div>
              <input
                maxLength="4"
                {...register("carNumber", {
                  maxLength: {
                    value: 4,
                    message: "최대 4자리까지만 입력이 됩니다.",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "숫자만 입력이 가능합니다.",
                  },
                })}
                type="text"
                placeholder="차량번호 뒷 4자리를 입력해 주세요."
              />
              <span className="form-errors">{errors?.carNumber?.message}</span>
            </div>
            <div className="input-group">
              <div>메모</div>
              <input
                {...register("memo")}
                type="text"
                maxLength="100"
                placeholder="최대 100자까지 입력해 주세요."
              />
            </div>
          </section>
          <section>
            <div className="reg-title">
              <img src={RegIcon3} alt="icon3" />
              <h2>방문장소 정보</h2>
            </div>
            <div className="input-group" onChange={handleSiteChange}>
              <div>방문지 대분류</div>
              <select
                {...register("placeToVisit1", {
                  required: "방문지 대분류는 필수 입력 사항입니다.",
                })}
              >
                <option value="">선택해주세요</option>
                {parentSite?.map((item, index) => (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              <span className="form-errors more-left">
                {errors?.placeToVisit1?.message}
              </span>
            </div>
            <div className="input-group">
              <div>방문지 중분류</div>
              <select {...register("placeToVisit2")}>
                <option>선택해주세요</option>
                {dataChild?.map((item, index) => (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <div>방문목적</div>
              <select
                {...register("purposeOfVisit", {
                  required: "방문목적은 필수 입력 사항입니다.",
                })}
              >
                <option value="">선택해주세요</option>
                {orderedPurposeOfVisit?.map((item, index) => (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              <span className="form-errors more-left">
                {errors?.purposeOfVisit?.message}
              </span>
            </div>
            <div className="input-group ">
              <div>방문일시</div>
              <input
                type="date"
                {...register("date", {
                  required: "방문일시는 필수 입력 사항입니다.",
                })}
              />
              <span className="form-errors more-left">
                {errors?.date?.message}
              </span>
            </div>
            <div className="input-group ">
              <div>방문시간</div>
              <input
                type="time"
                {...register("time", {
                  required: "방문시간은 필수 입력 사항입니다.",
                })}
              />
              <span className="form-errors more-left">
                {errors?.time?.message}
              </span>
            </div>
          </section>
          <div className="btn-container">
            {isLoading ? (
              <Button colorScheme="blue" w="24">
                <Spinner />
              </Button>
            ) : (
              <Button type="submit" colorScheme="blue" w="24">
                등록하기
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
