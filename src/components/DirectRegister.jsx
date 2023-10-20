import "./DirectRegister.css";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { divideDate } from "../utils/divideDate";
import RegIcon2 from "../assets/svg/security-register2.svg";
import RegIcon3 from "../assets/svg/security-register3.svg";
import { Button } from "@chakra-ui/react";
import {
  apiGetPurposeOfVisit,
  apiGetVisitSite,
  apiVisitReservationRegister,
} from "../api";
import useVisitSite from "../hooks/useVisitSite";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DirectRegister() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  // 방문목적 불러오기
  const { data: dataPurposeOfVisits } = useQuery(
    ["getPurposeOfVisit", visitSiteIndex],
    apiGetPurposeOfVisit
  );

  // 방문지 불러오기
  const { data: dataVisitSite } = useQuery(
    ["getVisitSite", visitSiteIndex],
    apiGetVisitSite
  );
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { mutate } = useMutation(
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

  const onSubmit = (formData) => {
    const reservationDate = divideDate(formData.date, formData.time);
    mutate([reservationDate, formData]);
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
                })}
                type="text"
                placeholder="성함을 입력해 주세요."
              />
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
                })}
                type="text"
                placeholder="휴대전화번호를 입력해 주세요."
              />
              <span className="form-errors">{errors?.tel?.message}</span>
            </div>
            <div className="input-group">
              <div>차량번호</div>
              <input
                {...register("carNumber")}
                type="text"
                placeholder="차량번호를 입력해 주세요."
              />
            </div>
            <div className="input-group">
              <div>메모</div>
              <input
                {...register("memo")}
                type="text"
                placeholder="메모를 입력해 주세요."
              />
            </div>
          </section>
          <section>
            <div className="reg-title">
              <img src={RegIcon3} alt="icon3" />
              <h2>방문장소 정보</h2>
            </div>
            <div className="input-group">
              <div>방문지</div>
              <select {...register("placeToVisit")}>
                <option>선택해주세요</option>
                {dataVisitSite?.placeToVisits?.map((item, index) => (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <div>방문목적</div>
              <select {...register("purposeOfVisit")}>
                <option>선택해주세요</option>
                {dataPurposeOfVisits?.purposeOfVisits?.map((item, index) => (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group ">
              <div>방문일시</div>
              <input type="date" {...register("date", { required: true })} />
            </div>
            <div className="input-group ">
              <div>방문시간</div>
              <input type="time" {...register("time", { required: true })} />
            </div>
          </section>
          <div className="btn-container">
            <Button type="submit" colorScheme="blue">
              등록하기
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
