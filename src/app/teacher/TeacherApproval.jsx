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
import { timeEnd, timeStart } from "../../utils/timeStatEnd";
import SearchLocation from "../../components/SearchLocation";
import SearchDate from "../../components/SearchDate";
import SearchStatus from "../../components/SearchStatus";
import SearchKeyword from "../../components/SearchKeyword";
import { nameHidden } from "../../utils/nameHidden";

export default function TeacherApproval() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [searchOption, setSearchOption] = useState({
    state: -1,
    placeToVisit: "",
    startDate: timeStart(),
    endDate: timeEnd(),
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

  return (
    <Layout menu={TEACHER_LIST}>
      <div className="teacher-approval">
        {/* 일괄승인 */}
        {/* <AllPass /> */}

        {/* 검색 */}
        <div className="teacher-history__search">
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
        </div>

        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <td>No</td>
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
            {!data ? (
              <tr>
                <td colSpan={8}>
                  <div>해당하는 데이터가 없습니다.</div>
                </td>
              </tr>
            ) : (
              data?.resevations?.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{nameHidden(item.visitorName)}</td>
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
                            return;
                        }
                      })()}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
