// 관리자
// 방문 예약 확인
// 목록

import "./AdminConfirm.css";
import React, { useState } from "react";
import { ADMIN_LIST } from "../../lib/menuList";
import Layout from "../../components/Layout";
import {
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import SearchLocation from "../../components/SearchLocation";
import SearchDate from "../../components/SearchDate";
import SearchStatus from "../../components/SearchStatus";
import SearchKeyword from "../../components/SearchKeyword";
import AdminConfirmDetail from "./AdminConfirmDetail";
import { useQuery } from "react-query";
import { apiGetVisitReservation } from "../../api";
import useVisitSite from "../../hooks/useVisitSite";
import { dateFormat } from "../../utils/dateFormat";
import { dateNowChange } from "../../utils/dateNowChange";

export default function AdminConfirm() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [selectData, setSelectData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // search
  const [searchOption, setSearchOption] = useState({
    state: -1,
    placeToVisit: "",
    startDate: dateNowChange(Date.now()),
    endDate: "",
    searchValue: "",
  });
  const { data } = useQuery(
    [
      "getVisitReservation",
      {
        visitSiteIndex,
        page: 1,
        pageRange: 10,
        state: searchOption.state,
        startDate: searchOption.startDate,
        endDate: searchOption.endDate,
        searchValue: searchOption.searchValue,
        placeToVisit: searchOption.placeToVisit,
      },
    ],
    apiGetVisitReservation
  );

  console.log(data);

  // end search

  const handleEditClick = (index) => {
    onOpen();
    setSelectData(index);
  };

  return (
    <Layout menu={ADMIN_LIST}>
      <Modal onClose={onClose} size="5xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>방문예약확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AdminConfirmDetail selectData={selectData} onClose={onClose} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <div className="admin-confirm">
        {/* search */}
        <div className="search-group">
          <SearchLocation
            searchOption={searchOption}
            setSearchOption={setSearchOption}
          />
          <SearchDate
            searchOption={searchOption}
            setSearchOption={setSearchOption}
          />
          <SearchStatus
            searchOption={searchOption}
            setSearchOption={setSearchOption}
          />
          <SearchKeyword
            searchOption={searchOption}
            setSearchOption={setSearchOption}
          />
          {/* <ButtonSearch text="검색" /> */}
        </div>
        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <td>선택</td>
              <td>방문지</td>
              <td>방문객명</td>
              <td>차량번호</td>
              <td>방문예정일시</td>
              <td>목적</td>
              <td>예약일시</td>
              <td>담당자</td>
              <td>상태</td>
            </tr>
          </thead>
          <tbody>
            {data?.resevations?.map((item, i) => (
              <tr
                onClick={() => handleEditClick(item.visitReservationIndex)}
                key={i}
                className="table-hover"
              >
                <td>
                  <Checkbox position="absolute" top="42%" />
                </td>

                <td>{item.placeToVisit}</td>
                <td>{item.visitorName}</td>
                <td>{item.carNumber}</td>
                <td>{dateFormat(item.reservationDate)}</td>
                <td>{item.purposeOfVisit}</td>
                <td>{dateFormat(item.regDate)}</td>
                <td>{item.managerName}</td>
                <td>
                  <div className="approval-status">
                    {(() => {
                      switch (item.state) {
                        case 0:
                          return <div>대기중</div>;
                        case 1:
                          return <div>승인</div>;
                        case 2:
                          return <div>미승인</div>;
                        case 3:
                          return <div>방문</div>;
                        case 4:
                          return <div>예약취소</div>;
                        default:
                          return;
                      }
                    })()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
