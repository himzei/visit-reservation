import React, { useState } from "react";
import RegIcon1 from "../../assets/svg/person-input.svg";
import RegIcon2 from "../../assets/svg/location-icon.svg";
import RegIcon3 from "../../assets/svg/person-icon.svg";
import RegIcon4 from "../../assets/svg/status-icon.svg";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useVisitSite from "../../hooks/useVisitSite";
import {
  apiGetManager,
  apiGetVisitReservationOne,
  apiManagerGet,
  apiManagerRegister,
  apiPutVisitReservationOne,
} from "../../api";
import { Button, HStack, Spinner } from "@chakra-ui/react";
import { nameHidden } from "../../utils/nameHidden";
import { mobileFormat } from "../../utils/mobileFormat";

export default function TeacherApprovalDetail({ selectData, onClose }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const [managerPosition, setNanagerPosition] = useState("");
  const [accountIndex, setAccountIndex] = useState(0);

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
  const { isLoading: dataIsLoading, data } = useQuery(
    ["getVisitReservationOne", { visitReservationIndex: selectData }],
    apiGetVisitReservationOne
  );

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
  // const { mutate: mutateEditManager } = useMutation((formData) =>
  //   apiManagerPut(formData)
  // );

  // useQuery
  // 배정된 매니져 불러오기
  const { data: dataGetManager } = useQuery(
    ["managerGet", { visitReservationIndex: selectData }],
    apiManagerGet
  );

  const isManager = Boolean(dataGetManager);

  // 저장 버튼 클릭시
  // 담당자 선택 mutate 실행 및 상태 mutate 실행
  const onSubmit = (formData) => {
    if (isManager) {
      // 매니져 수정
      // alert(formData.name);
      // mutateEditManager(formData);
    } else {
      // 매니져 추가
      mutateManager(formData);
    }

    mutateState(formData);
  };

  const handleChange = (e) => {
    const name = e.target.value;
    const temp = dataManager?.accounts?.find((item) => item.name === name);
    setNanagerPosition(temp.position);
    setAccountIndex(temp.accountIndex);
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {dataIsLoading ? (
        <HStack justifyContent="center" py="10">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </HStack>
      ) : (
        <div className="admin-confirm-detail">
          <section>
            <div className="reg-title">
              <img src={RegIcon1} alt="icon1" />
              <h2>방문객 정보</h2>
            </div>
            <div className="input-group">
              <div>방문객명</div>
              <div>{nameHidden(data?.visitors[0]?.name)}</div>
            </div>
            <div className="input-group">
              <div>휴대전화번호</div>
              <div>{mobileFormat(data?.visitors[0]?.tel)}</div>
            </div>
            <div className="input-group">
              <div>차량번호</div>
              <div>{data?.visitors[0]?.carNumber}</div>
            </div>
          </section>

          <section>
            <div className="reg-title">
              <img src={RegIcon2} alt="icon2" />
              <h2>방문장소 정보</h2>
            </div>
            <div className="input-group">
              <div>방문지</div>
              <div>{data?.visitors[0]?.placeToVisit}</div>
            </div>
            <div className="input-group">
              <div>방문 목적</div>
              <div>{data?.visitors[0]?.purposeOfVisit}</div>
            </div>
            <div className="input-group">
              <div>방문일시</div>
              <div>{data?.visitReservation?.reservationDate.substr(0, 10)}</div>
            </div>
            <div className="input-group">
              <div>방문시간</div>
              <div>{data?.visitReservation?.reservationDate.substr(11, 5)}</div>
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
                    defaultValue={item.name}
                    selected={item.name === dataGetManager?.managers[0]?.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <div>권한</div>
              <select {...register("auth")}>
                <option>선택</option>
                <option value="0">담당</option>
                <option value="1" selected>
                  협조
                </option>
                <option value="2">배정</option>
              </select>
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
              <div className="radio-container">
                <div>
                  <label id="0">
                    <input
                      htmlFor="0"
                      type="radio"
                      {...register("state")}
                      value="0"
                      defaultChecked={
                        data.visitReservation.state === 0 ? true : false
                      }
                    />
                    대기중
                  </label>
                </div>
                <div>
                  <label id="one">
                    <input
                      htmlFor="one"
                      type="radio"
                      {...register("state")}
                      value="1"
                      defaultChecked={
                        data?.visitReservation?.state === 1 ? true : false
                      }
                    />
                    승인
                  </label>
                </div>
                <div>
                  <label id="2">
                    <input
                      htmlFor="2"
                      type="radio"
                      {...register("state")}
                      value="2"
                      defaultChecked={
                        data?.visitReservation?.state === 2 ? true : false
                      }
                    />
                    반려
                  </label>
                </div>
              </div>
            </div>
            <div className="input-group">
              <div>반려사유</div>

              <input type="text" {...register("stateReason")} />
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
      )}
    </form>
  );
}
