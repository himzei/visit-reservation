import "./AdminConfirmDetail.css";
import React from "react";
import RegIcon1 from "../../assets/svg/person-input.svg";
import RegIcon2 from "../../assets/svg/location-icon.svg";
import RegIcon3 from "../../assets/svg/person-icon.svg";
import RegIcon4 from "../../assets/svg/status-icon.svg";
import useVisitSite from "../../hooks/useVisitSite";
import {
  apiGetPurposeOfVisit,
  apiGetVisitReservationOne,
  apiGetVisitSite,
  apiManagerRegister,
  apiPutVisitReservationOne,
} from "../../api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Button, HStack } from "@chakra-ui/react";

export default function AdminConfirmDetail({ selectData, onClose }) {
  const queryClient = useQueryClient();
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
  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const { data } = useQuery(
    ["getVisitReservationOne", { visitReservationIndex: selectData }],
    apiGetVisitReservationOne
  );

  const handleCloseClick = () => {
    onClose();
  };

  const { mutate: mutateState } = useMutation(
    (formData) => apiPutVisitReservationOne(formData, selectData),
    {
      onSuccess: (data) => {
        if (data?.result === 0) {
          handleCloseClick();
          queryClient.invalidateQueries("getVisitReservation");
        }
      },
    }
  );

  const { mutate: mutateManager } = useMutation((formData) =>
    apiManagerRegister(formData, visitSiteIndex, selectData)
  );

  const onSubmit = (formData) => {
    mutateManager(formData);
    mutateState(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="admin-confirm-detail">
        <section>
          <div className="reg-title">
            <img src={RegIcon1} alt="icon1" />
            <h2>방문객 정보</h2>
          </div>
          <div className="input-group">
            <div>방문객명</div>
            <input
              type="text"
              defaultValue={data?.visitors[0]?.name}
              readOnly
            />
          </div>
          <div className="input-group">
            <div>휴대전화번호</div>
            <input type="text" defaultValue={data?.visitors[0]?.tel} readOnly />
          </div>
          <div className="input-group">
            <div>차량번호</div>
            <input
              type="text"
              defaultValue={data?.visitors[0]?.carNumber}
              readOnly
            />
          </div>
        </section>
        <section>
          <div className="reg-title">
            <img src={RegIcon2} alt="icon2" />
            <h2>방문장소 정보</h2>
          </div>
          <div className="input-group">
            <div>방문지</div>
            <input
              type="text"
              defaultValue={data?.visitors[0]?.placeToVisit}
              readOnly
            />
          </div>
          <div className="input-group">
            <div>방문 목적</div>
            <input
              type="text"
              defaultValue={data?.visitors[0]?.purposeOfVisit}
              readOnly
            />
          </div>
          <div className="input-group">
            <div>방문일시</div>
            <input
              readOnly
              type="text"
              defaultValue={data?.visitReservation?.reservationDate.substr(
                0,
                10
              )}
            />
          </div>
          <div className="input-group">
            <div>방문시간</div>
            <input
              readOnly
              type="text"
              defaultValue={data?.visitReservation?.reservationDate.substr(
                11,
                5
              )}
            />
          </div>
        </section>

        {/* 담당자 선택 */}
        <section>
          <div className="reg-title">
            <img src={RegIcon3} alt="icon3" />
            <h2>담당자 선택</h2>
          </div>

          <div className="input-group">
            <div>이름</div>
            <input
              type="text"
              defaultValue={data?.managers[0]?.name}
              {...register("name")}
            />
          </div>
          <div className="input-group">
            <div>직책</div>
            <input
              type="text"
              defaultValue={data?.managers[0]?.position}
              {...register("position")}
            />
          </div>
          <div className="input-group">
            <div>메모</div>
            <input
              type="text"
              defaultValue={data?.managers[0]?.memo}
              {...register("memo")}
            />
          </div>
        </section>

        {/* 승인 */}
        <section>
          <div className="reg-title">
            <img src={RegIcon4} alt="icon3" />
            <h2>상태</h2>
          </div>
          <div className="input-group">
            <div>승인여부</div>
            <select {...register("state")}>
              <option
                className="select-default"
                value={0}
                selected={data?.visitReservation?.state === 0}
              >
                대기중
              </option>
              <option
                className="select-default"
                value={1}
                selected={data?.visitReservation?.state === 1}
              >
                승인
              </option>
              <option
                className="select-default"
                value={2}
                selected={data?.visitReservation?.state === 2}
              >
                미승인
              </option>
              <option
                className="select-default"
                value={3}
                selected={data?.visitReservation?.state === 3}
              >
                방문
              </option>
              <option
                className="select-default"
                value={4}
                selected={data?.visitReservation?.state === 4}
              >
                예약취소
              </option>
            </select>
          </div>{" "}
          <div className="input-group">
            <div>반려사유</div>
            <input
              type="text"
              {...register("stateReason")}
              defaultValue={data?.visitReservation?.memo}
            />
          </div>
        </section>
        <HStack mt="8">
          <Button width="100px" onClick={() => handleCloseClick(0)}>
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
      </div>
    </form>
  );
}
