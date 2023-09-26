//
// 방문 이력 조회
//

import "./AdminHistory.css";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { ADMIN_LIST } from "../../lib/menuList";
import SearchLocation from "../../components/SearchLocation";
import SearchDate from "../../components/SearchDate";
import SearchStatus from "../../components/SearchStatus";
import SearchKeyword from "../../components/SearchKeyword";
import { Button, Checkbox } from "@chakra-ui/react";
import AllPass from "../../components/AllPass";
import { useQuery } from "react-query";
import { apiGetLog } from "../../api";
import useVisitSite from "../../hooks/useVisitSite";
import { dateFormat } from "../../utils/dateFormat";
import { dateNowChange } from "../../utils/dateNowChange";

export default function AdminHistory() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [searchOption, setSearchOption] = useState({
    placeToVisit: "",
    startDate: dateNowChange(Date.now()),
    endDate: "",
    searchData: "",
  });

  const { data } = useQuery(
    [
      "getLog",
      {
        visitSiteIndex,
        startDate: searchOption.startDate,
        endDate: searchOption.endDate,
        page: 1,
        pageRange: 10,
        placeToVisit: searchOption.placeToVisit,
        searchData: searchOption.searchData,
      },
    ],
    apiGetLog
  );

  console.log(data);

  return (
    <Layout menu={ADMIN_LIST}>
      <div className="admin-history">
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
        </div>
        {/* 엑셀 다운로드 */}
        <div className="excel-group">
          <AllPass title="일괄승인" />
          <Button mx="2" colorScheme="green" size="sm">
            Excel 다운로드
          </Button>
        </div>
        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <td>선택</td>
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
                <td>
                  <Checkbox position="absolute" top="42%" />
                </td>
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
