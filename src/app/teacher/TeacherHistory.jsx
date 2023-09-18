// 담당자
// 방문 이력 조회
// 목록

import "./TeacherHistory.css";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { TEACHER_LIST } from "../../lib/menuList";
import SearchDate from "../../components/SearchDate";
import SearchStatus from "../../components/SearchStatus";
import SearchKeyword from "../../components/SearchKeyword";
import { Button } from "@chakra-ui/button";
import useVisitSite from "../../hooks/useVisitSite";
import { useQuery } from "react-query";
import { apiGetLog } from "../../api";
import { dateFormat } from "../../utils/dateFormat";
import { dateNowChange } from "../../utils/dateNowChange";
import SearchLocation from "../../components/SearchLocation";

export default function TeacherHistory() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [searchOption, setSearchOption] = useState({
    state: -1,
    placeToVisit: "",
    startDate: dateNowChange(Date.now()),
    endDate: "",
    searchValue: "",
  });

  const { data } = useQuery(
    [
      "getLog",
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
    apiGetLog
  );

  return (
    <Layout menu={TEACHER_LIST}>
      <div className="teacher-history">
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
              <td>방문지</td>
              <td>방문객명</td>
              <td>차량번호</td>
              <td>방문예약일시</td>
              <td>목적</td>
              <td>담당자</td>
              <td>상태</td>
            </tr>
          </thead>
          <tbody>
            {data?.logs?.map((item, i) => (
              <tr key={i}>
                <td>{item.placeToVisit}</td>
                <td>{item.visitorName}</td>
                <td>{item.carNumber}</td>
                <td>{dateFormat(item.regDate)}</td>
                <td>{item.purposeOfVisit}</td>
                <td>{item.managerName}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
