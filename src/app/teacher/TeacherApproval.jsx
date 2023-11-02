// 담당자
// 방문 승인
// 목록

import "./TeacherApproval.css";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { TEACHER_LIST } from "../../lib/menuList";
import useVisitSite from "../../hooks/useVisitSite";
import { useQuery } from "react-query";
import { apiGetVisitReservation } from "../../api";
import { dateFormat } from "../../utils/dateFormat";
import { monthThreeEnd, monthThreeStart } from "../../utils/timeStatEnd";
import { nameHidden } from "../../utils/nameHidden";
import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import TeacherApprovalDetail from "./TeacherApprovalDetail";
import Pagination from "react-js-pagination";

export default function TeacherApproval() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);

  const searchOption = {
    state: 0,
    placeToVisit: "",
    startDate: monthThreeStart(),
    endDate: monthThreeEnd(),
    searchValue: "",
  };

  const { data, isLoading } = useQuery(
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
  const handlePageChange = (page) => {
    setPage(page);
  };

  const [selectData, setSelectData] = useState(null);
  const handleEditClick = (index) => {
    onOpen();
    setSelectData(index);
  };

  return (
    <Layout menu={TEACHER_LIST}>
      <Modal onClose={onClose} size="5xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>방문예약확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TeacherApprovalDetail selectData={selectData} onClose={onClose} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      {isLoading ? (
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
        <div className="teacher-approval">
          {/* 일괄승인 */}
          {/* <AllPass /> */}

          {/* 검색 */}

          {/* 테이블 */}
          <table>
            <thead>
              <tr>
                <p>No</p>
                <p>방문객명</p>
                <p>연락처</p>
                <p>차량번호</p>
                <p>방문예정일시</p>
                <p>출입일시</p>
                <p>목적</p>
                <p>반려사유</p>
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
                    key={i}
                    className="table-hover"
                    onClick={() => handleEditClick(item.visitReservationIndex)}
                  >
                    <div className="td-div-all">
                      <div className="td-div">
                        <div className="td-div-p">
                          <p>No</p>
                        </div>
                        <div className="td-div-td">
                          <td>{totalItemsCount - i - (page - 1) * 10}</td>
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
                          <p>연락처</p>
                        </div>
                        <div className="td-div-td">
                          <td>{item.visitorTel}</td>
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
                          <p>출입일시</p>
                        </div>
                        <div className="td-div-td">
                          <td>{dateFormat(item.visitDate)}</td>
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
                          <p>반려사유</p>
                        </div>
                        <div className="td-div-td">
                          <td>{item.stateReason}</td>
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
      )}
    </Layout>
  );
}
