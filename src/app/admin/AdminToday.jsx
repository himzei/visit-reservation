import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import { apiGetVisitReservation } from "../../api";
import { useQuery } from "react-query";
import { nameHidden } from "../../utils/nameHidden";
import { dateFormat } from "../../utils/dateFormat";
import { Checkbox } from "@chakra-ui/react";
import useVisitSite from "../../hooks/useVisitSite";
import { timeEnd, timeStart } from "../../utils/timeStatEnd";

export default function AdminToday() {
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
    <Layout menu={ADMIN_LIST}>
      <div>
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
              <tr key={i} className="table-hover">
                <td>
                  <Checkbox position="absolute" top="42%" />
                </td>

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
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
