import "./AdminConfirmDetail.css";
import React, { useState } from "react";
import RegIcon1 from "../../assets/svg/person-input.svg";
import RegIcon2 from "../../assets/svg/location-icon.svg";
import RegIcon3 from "../../assets/svg/person-icon.svg";
import RegIcon4 from "../../assets/svg/status-icon.svg";
import useVisitSite from "../../hooks/useVisitSite";
import {
  apiGetManager,
  apiGetVisitReservationOne,
  apiManagerGet,
  apiManagerPut,
  apiManagerRegister,
  apiPutVisitReservationOne,
} from "../../api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Button, HStack } from "@chakra-ui/react";
import { nameHidden } from "../../utils/nameHidden";
import { mobileFormat } from "../../utils/mobileFormat";

export default function AdminConfirmDetail({ selectData, onClose }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  // useQuery
  // 매니져 불러오기
  const { data: dataManager } = useQuery(
    ["getManager", { visitSiteIndex, page: 1, pageRange: 10 }],
    apiGetManager
  );

  // useQuery
  // 디테일 불러오기
  const { data } = useQuery(
    ["getVisitReservationOne", { visitReservationIndex: selectData }],
    apiGetVisitReservationOne
  );
  // console.log("디테일", data);

  // useMutation
  // 승인 반려 수정
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

  // useMutation
  // 매니져 배정 및 등록하기
  const { mutate: mutateManager } = useMutation((formData) =>
    apiManagerRegister(
      formData,
      visitSiteIndex,
      selectData,
      managerPosition,
      accountIndex
    )
  );

  // useMuatation
  // 매니져 수정 등록하기
  const { mutate: mutateEditManager } = useMutation((formData) =>
    apiManagerPut(formData)
  );

  // useQuery
  // 배정된 매니져 불러오기
  const { data: dataGetManager } = useQuery(
    ["managerGet", { visitReservationIndex: selectData }],
    apiManagerGet
  );
  console.log("선택된 매니져", dataGetManager);
  const isManager = Boolean(dataGetManager);

  // 저장 버튼 클릭시
  // 담당자 선택 mutate 실행 및 상태 mutate 실행
  const onSubmit = (formData) => {
    if (isManager) {
      // 매니져 수정
      console.log(formData);
      // alert(formData.name);
      // mutateEditManager(formData);
    } else {
      // 매니져 추가
      mutateManager(formData);
    }

    mutateState(formData);
  };

  const handleCloseClick = () => {
    onClose();
  };

  const [managerPosition, setNanagerPosition] = useState("");
  const [accountIndex, setAccountIndex] = useState(0);

  const handleChange = (e) => {
    const name = e.target.value;
    const temp = dataManager?.accounts?.find((item) => item.name === name);
    setNanagerPosition(temp.position);
    setAccountIndex(temp.accountIndex);
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
              defaultValue={nameHidden(data?.visitors[0]?.name)}
              readOnly
            />
          </div>
          <div className="input-group">
            <div>휴대전화번호</div>
            <input
              type="text"
              defaultValue={mobileFormat(data?.visitors[0]?.tel)}
              readOnly
            />
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
            <select {...register("name")} onChange={(e) => handleChange(e)}>
              <option>선택해주세요</option>
              {dataManager?.accounts?.map((item, index) => (
                <option
                  key={index}
                  value={item.name}
                  selected={item.name === dataGetManager?.managers.at(-1).name}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <div>직책</div>
            <input
              type="text"
              {...register("managerPosition")}
              value={managerPosition}
            />
          </div>
          <div className="input-group">
            <div>메모</div>
            <input
              type="text"
              // defaultValue={data?.managers[0]?.memo}
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
                반려
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
