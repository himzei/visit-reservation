import "./TeacherToday.css";
import React, { useState } from "react";
import { TEACHER_LIST } from "../../lib/menuList";
import Layout from "../../components/Layout";
import { nameHidden } from "../../utils/nameHidden";
import { dateFormat } from "../../utils/dateFormat";
import { useQuery } from "react-query";
import { apiGetVisitReservation } from "../../api";
import useVisitSite from "../../hooks/useVisitSite";
import { timeEnd, timeStart } from "../../utils/timeStatEnd";

export default function TeacherToday() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [searchOption, setSearchOption] = useState({
    state: 3,
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
      <div className="teacher-today">
        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <td>No</td>
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
            {!data ? (
              <tr>
                <td colSpan={8}>
                  <div>해당하는 데이터가 없습니다.</div>
                </td>
              </tr>
            ) : (
              data?.resevations?.map((item, i) => (
                <tr key={i} className="table-hover">
                  <td>{i + 1}</td>

                  <td>{item.placeToVisit}</td>
                  <td>{nameHidden(item.visitorName)}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
