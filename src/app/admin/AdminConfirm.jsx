// 관리자
// 방문 예약 확인
// 목록

import "./AdminConfirm.css";
import React, { useEffect, useState } from "react";
import { ADMIN_LIST } from "../../lib/menuList";
import Layout from "../../components/Layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import AdminConfirmDetail from "./AdminConfirmDetail";
import { useQuery } from "react-query";
import { apiGetVisitReservation } from "../../api";
import useVisitSite from "../../hooks/useVisitSite";
import { dateFormat } from "../../utils/dateFormat";
import { nameHidden } from "../../utils/nameHidden";
import { monthThreeEnd, monthThreeStart } from "../../utils/timeStatEnd";
import { useLocation } from "react-router-dom";
import { mobileFormat } from "../../utils/mobileFormat";

import "./Paging.css";
import Pagination from "react-js-pagination";

export default function AdminConfirm() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [selectData, setSelectData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);

  // search
  const searchOption = {
    state: 0,
    placeToVisit: "",
    startDate: monthThreeStart(),
    endDate: monthThreeEnd(),
    searchValue: "",
  };
  const { data } = useQuery(
    [
      "getVisitReservation",
      {
        visitSiteIndex,
        page: page,
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

  const totalItemsCount = data?.totalCnt;
  const handleEditClick = (index) => {
    onOpen();
    setSelectData(index);
  };

  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const visitreservation = queryParams.get("visitreservation");
  useEffect(() => {
    if (visitreservation) {
      setSelectData(visitreservation);
      onOpen();
    }
  }, [onOpen, visitreservation]);

  // *******************************************************************************

  const handlePageChange = (page) => {
    setPage(page);
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

        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <p>No</p>
              <p>방문지</p>
              <p>방문객명</p>
              <p>전화번호</p>
              <p>차량번호</p>
              <p>방문예정일시</p>
              <p>목적</p>
              <p>예약일시</p>
              <p>상태</p>
            </tr>
          </thead>
          <tbody>
            {!data ? (
              <tr>
                <p colSpan={8}>
                  <div>해당하는 데이터가 없습니다.</div>
                </p>
              </tr>
            ) : (
              data?.resevations?.map((item, i) => (
                <tr
                  onClick={() => handleEditClick(item.visitReservationIndex)}
                  key={i}
                  className="table-hover"
                >
                  <div className="td-div-all">
                    <div className="td-div">
                      <div className="td-div-p">
                        <p>No</p>
                      </div>
                      <div className="td-div-td">
                        <td>{i + 1 + (page - 1) * 10}</td>
                      </div>
                    </div>

                    <div className="td-div">
                      <div className="td-div-p">
                        <p>방문지</p>
                      </div>
                      <div className="td-div-td">
                        <td>{item.placeToVisit}</td>
                      </div>
                    </div>

                    <div className="td-div">
                      <div className="td-div-p">
                        <p>방문객명</p>
                      </div>
                      <div className="td-div-td">
                        <td>{nameHidden(item.visitorName)}</td>
                      </div>
                    </div>

                    <div className="td-div">
                      <div className="td-div-p">
                        <p>전화번호</p>
                      </div>
                      <div className="td-div-td">
                        <td>{mobileFormat(item.visitorTel)}</td>
                      </div>
                    </div>

                    <div className="td-div">
                      <div className="td-div-p">
                        <p>차량번호</p>
                      </div>
                      <div className="td-div-td">
                        <td>{item.carNumber}</td>
                      </div>
                    </div>

                    <div className="td-div">
                      <div className="td-div-p">
                        <p>방문예정일시</p>
                      </div>
                      <div className="td-div-td">
                        <td>{dateFormat(item.reservationDate)}</td>
                      </div>
                    </div>

                    <div className="td-div">
                      <div className="td-div-p">
                        <p>목적</p>
                      </div>
                      <div className="td-div-td">
                        <td>{item.purposeOfVisit}</td>
                      </div>
                    </div>

                    <div className="td-div">
                      <div className="td-div-p">
                        <p>예약일시</p>
                      </div>
                      <div className="td-div-td">
                        <td>{dateFormat(item.regDate)}</td>
                      </div>
                    </div>

                    <div className="td-div">
                      <div className="td-div-p">
                        <p>상태</p>
                      </div>
                      <div className="td-div-td">
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
                      </div>
                    </div>
                  </div>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div>
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
}
