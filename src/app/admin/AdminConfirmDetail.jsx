import "./AdminConfirmDetail.css";
import React, { useState, useEffect } from "react";
import RegIcon1 from "../../assets/svg/person-input.svg";
import RegIcon2 from "../../assets/svg/location-icon.svg";
import RegIcon3 from "../../assets/svg/person-icon.svg";
import RegIcon4 from "../../assets/svg/status-icon.svg";
import useVisitSite from "../../hooks/useVisitSite";
import {
  apiGetManager,
  apiGetVisitReservationOne,
  apiGetVisitSite,
  apiManagerGet,
  apiManagerPut,
  apiManagerRegister,
  apiPutVisitReservationOne,
} from "../../api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Button, HStack, Spinner } from "@chakra-ui/react";
import { nameHidden } from "../../utils/nameHidden";
import { mobileFormat } from "../../utils/mobileFormat";

export default function AdminConfirmDetail({ selectData, onClose }) {
  const queryClient = useQueryClient();
  // useQuery
  // 배정된 매니져 불러오기
  const { isLoading, data: dataGetManager } = useQuery(
    ["managerGet", { visitReservationIndex: selectData }],
    apiManagerGet
  );
  // 배정된 담당자가있다면 표시 모달창에 표시
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedAuth, setSelectedAuth] = useState("");

  const chargedManager = dataGetManager?.managers[0];
  // 콤보박스 셀렉트를 하기위한 구문
  const managerAuth = chargedManager?.auth;
  const isManagerIndex = chargedManager?.managerIndex;
  const managerName = chargedManager?.name;

  useEffect(() => {
    if (chargedManager) {
      // 매니저 이름 설정
      setSelectedManager(chargedManager.name);
  
      // 매니저의 권한 설정 (권한 값이 정의되어 있는 경우)
      if (chargedManager.auth !== undefined) {
        setSelectedAuth(chargedManager.auth.toString());
      }
    }
  }, [chargedManager]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: { name: chargedManager, auth: managerAuth },
  });

  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  // useQuery
  // 매니져 불러오기
  const { data: dataManager } = useQuery(
    ["getManager", { visitSiteIndex, page: 1, pageRange: 1000 }],
    apiGetManager
  );


  // useQuery
  // 디테일 불러오기
  const { isLoading: dataIsLoading, data } = useQuery(
    ["getVisitReservationOne", { visitReservationIndex: selectData }],
    apiGetVisitReservationOne
  );

  // 상세데이터에서 방문지 정보 불러오기
  // 불러온 방문지 데이터에서 PlaceToVisitIndex 값 추출
  // plceToVisitIndex 값으로 등록된 매니져의와 비교하여 필터링
  const tempString = data?.visitors[0]?.placeToVisit;
  const stringVisit1 = tempString?.split(" ")[0];
  const stringVisit2 = tempString?.split(" ")[1];

  // 방문지 불러오기
  const { data: dataVisitSite } = useQuery(
    ["getVisitSite", visitSiteIndex],
    apiGetVisitSite
  );


  const tempVisit1 = dataVisitSite?.placeToVisits?.find(
    (item) => item.title === stringVisit1
  );

  console.log("dataVisitSite", dataVisitSite?.placeToVisits);

  // 방문지의 선택지
  const selectedIndex = tempVisit1?.placeToVisitIndex;
  const tempAccount = dataManager?.accounts;

  const tempVisit2 = dataVisitSite?.placeToVisits?.find(
    (item) => item.parentIndex === selectedIndex &&
      item.title === stringVisit2
  );



  const selectedIndex2 = tempVisit2?.placeToVisitIndex;


  // 불러온 모든 매니져 중에 방문지가 현재 불러온 페이지의 방문지와 같은 경우만 리스트
  const selectAccount = tempAccount?.filter(
    (item) =>
      item.managePlaceToVisit?.parentPlaceToVisitIndex === parseInt(selectedIndex) &&
      item.managePlaceToVisit?.placeToVisitIndex === parseInt(selectedIndex2)
  );
  console.log("parentPlaceToVisitIndex 의 값", selectedIndex);
  console.log("placeToVisitIndex 의 값", selectedIndex2);
  console.log("tempAccount", tempAccount);
  // console.log("학급", selectAccount);  


  const inChargedManger =
    selectAccount?.length !== 0 ? selectAccount : dataManager?.accounts;

  // console.log(inChargedManger);
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
  const { mutate: mutateManager } = useMutation(
    (formData) =>
      apiManagerRegister(
        formData,
        visitSiteIndex,
        selectData,
        managerPosition,
        accountIndex
      ),
    {
      onSuccess: (data) => { },
    }
  );

  // useMuatation
  // 매니져 수정 등록하기

  const { mutate: mutateEditManager } = useMutation(
    (formData) => apiManagerPut(formData, accountIndex),
    {
      onSuccess: (data) => {
        if (data.result === 0) {
          queryClient.invalidateQueries("managerGet");
        }
      },
    }
  );

  // 저장 버튼 클릭시
  // 담당자 선택 mutate 실행 및 상태 mutate 실행
  const onSubmit = (formData) => {
    // 매니져 수정
    if (chargedManager === undefined) {
      // alert("매지저 배정전");
      mutateManager(formData);
    } else {
      // alert("매니져 배정됨");
      // console.log(formData);
      mutateEditManager({ formData, isManagerIndex });
    }

    if (window.confirm("수정 하시겠습니까?")) {
      mutateState(formData);
      window.location.reload();
    }
  };

  const handleCloseClick = () => {
    window.location.reload();
    onClose();
  };

  // const temp = dataManager?.accounts?.find((item) => item.name === name);

  // console.log(managerName);
  // console.log(initManagerName);
  const [managerPosition, setNanagerPosition] = useState("");
  // accountIndex?
  const [accountIndex, setAccountIndex] = useState(isManagerIndex);

  const handleChange = (e) => {
    const name = e.target.value;
    const temp = dataManager?.accounts?.find((item) => item.name === name);
    setNanagerPosition(temp?.position);
    setAccountIndex(temp?.accountIndex);
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
            <div className="input-group">
              <div>메모</div>
              <div>{data?.visitReservation?.memo}</div>
            </div>
          </section>

          {/* 담당자 선택 */}
          {!isLoading && (
            <section>
              <div className="reg-title">
                <img src={RegIcon3} alt="icon3" />
                <h2>담당자 선택</h2>
              </div>

              {/* {managerName && (
                <>
                  <div className="input-group input-selected">
                    <div>선택된 담당자</div>
                    <div>{managerName}</div>
                  </div>
                  <div className="input-group input-selected">
                    <div>권한</div>
                    <div>
                      {managerAuth === 0
                        ? "담담"
                        : managerAuth === 1
                          ? "협조"
                          : "배정"}
                    </div>
                  </div>
                </>
              )} */}

              <div className="input-group">
                <div>이름</div>
                <select
                  {...register("name", {
                    required: "담당자 선택은 필수 입력사항입니다. ",
                  })}
                  value={selectedManager}
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedManager(e.target.value);
                  }}
                >
                  <option value="">선택하세요</option>
                  {selectAccount && selectAccount.length > 0 ? (
                    selectAccount.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option value="">담당자 없음</option>
                  )}
                </select>
                <span className="form-errors more-left">
                  {errors?.name?.message}
                </span>
              </div>
              <div className="input-group">
                <div>권한</div>
                <select
                  {...register("auth", {
                    required: "권한은 필수 입력사항입니다. ",
                  })}
                  value={selectedAuth}
                  onChange={(e) => setSelectedAuth(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="0">담당</option>
                  <option value="1">협조</option>
                  <option value="2">배정</option>
                </select>
                <span className="form-errors more-left">
                  {errors?.auth?.message}
                </span>
              </div>
            </section>
          )}

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
            {watch("state") === "2" && (
              <div className="input-group">
                <div>반려사유</div>
                <input type="text" {...register("stateReason")} placeholder="반려 사유를 입력하여 주세요." />
              </div>
            )}
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