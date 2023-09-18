// 입구관리자(안전지킴이)
// 방문 예약 현황
// 목록

import "./SecurityStatus.css";
import React from "react";
import Layout from "../../components/Layout";
import { Button, Input } from "@chakra-ui/react";
import { SECURITY_LIST } from "../../lib/menuList";
import useVisitSite from "../../hooks/useVisitSite";
import { useQuery } from "react-query";
import { apiGetVisitReservation } from "../../api";
import { dateFormat } from "../../utils/dateFormat";

export default function SecurityStatus() {
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
    <Layout menu={SECURITY_LIST}>
      <div className="security-container">
        <section>
          {/* 검색창 */}
          <div className="security-search">
            <div className="security-search__label">검색어</div>
            <Input type="text" />
            <Button colorScheme="blue" width="100px">
              검색
            </Button>
          </div>
          {/* 테이블 */}
          <table>
            <thead>
              <tr>
                <td>방문지</td>
                <td>방문객명</td>
                <td>연락처</td>
                <td>차량번호</td>
                <td>방문예정일</td>
                <td>목적</td>
                <td>출입일시</td>
                <td>상태</td>
              </tr>
            </thead>
            <tbody>
              {data?.resevations?.map((item, i) => (
                <tr key={i}>
                  <td>{item.placeToVisit}</td>
                  <td>{item.visitorName}</td>
                  <td>{item.visitorTel}</td>
                  <td>{item.carNumber}</td>
                  <td>{dateFormat(item.visitDate)}</td>
                  <td>{item.purposeOfVisit}</td>
                  <td>__</td>
                  <td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2>최근 출입자</h2>
          <table>
            <thead>
              <tr>
                <td>방문지</td>
                <td>방문객명</td>
                <td>연락처</td>
                <td>차량번호</td>
                <td>방문예정일</td>
                <td>목적</td>
                <td>출입일시</td>
                <td>상태</td>
              </tr>
            </thead>
            {/* 최근출입자 */}
            <tbody>
              <tr className="table-accent">
                <td>행정실</td>
                <td>홍길동</td>
                <td>010-****-1234</td>
                <td>42누 1234</td>
                <td>2023-10-16 16:30</td>
                <td>진학상담</td>
                <td>2023-10-14 16:00</td>
                <td>승인</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  );
}
