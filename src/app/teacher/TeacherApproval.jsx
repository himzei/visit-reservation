// 담당자
// 방문 승인
// 목록

import "./TeacherApproval.css";
import React from "react";
import Layout from "../../components/Layout";
import { TEACHER_LIST } from "../../lib/menuList";
import { Box, Checkbox } from "@chakra-ui/react";
import AllPass from "../../components/AllPass";
import useVisitSite from "../../hooks/useVisitSite";
import { useQuery } from "react-query";
import { apiGetVisitReservation } from "../../api";
import { dateFormat } from "../../utils/dateFormat";

export default function TeacherApproval() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const { data } = useQuery(
    [
      "getVisitReservation",
      {
        visitSiteIndex,
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        page: 1,
        pageRange: 10,
        state: -1,
        searchValue: "",
        placeToVisit: "",
      },
    ],
    apiGetVisitReservation
  );

  return (
    <Layout menu={TEACHER_LIST}>
      <div className="teacher-approval">
        {/* 일괄승인 */}
        {/* <AllPass /> */}
        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <td>선택</td>
              <td>방문객명</td>
              <td>연락처</td>
              <td>차량번호</td>
              <td>방문예정일시</td>
              <td>출입일시</td>
              <td>목적</td>
              <td>반려사유</td>
              <td>상태</td>
            </tr>
          </thead>
          <tbody>
            {data?.resevations?.map((item, i) => (
              <tr key={i}>
                <td>
                  <Checkbox />
                </td>
                <td>{item.visitorName}</td>
                <td>{item.visitorTel}</td>
                <td>{item.carNumber}</td>
                <td>{dateFormat(item.reservationDate)}</td>
                <td>{dateFormat(item.visitDate)}</td>
                <td>{item.purposeOfVisit}</td>
                <td>{item.stateReason}</td>
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
                          console.log("d");
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
