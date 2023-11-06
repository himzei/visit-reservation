// 담당자
// 방문 이력 조회
// 목록

import "./TeacherHistory.css";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { TEACHER_LIST } from "../../lib/menuList";
import SearchDate from "../../components/SearchDate";
import SearchStatus from "../../components/SearchStatus";
import useVisitSite from "../../hooks/useVisitSite";
import { useQuery } from "react-query";
import { apiGetLog } from "../../api";
import { dateFormat } from "../../utils/dateFormat";
import { dateNowChange } from "../../utils/dateNowChange";
import SearchLocation from "../../components/SearchLocation";
import { nameHidden } from "../../utils/nameHidden";
import Pagination from "react-js-pagination";
import SearchData from "../../components/SearchData";
import { HStack, Spinner } from "@chakra-ui/react";

export default function TeacherHistory() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [page, setPage] = useState(1);

  const [searchOption, setSearchOption] = useState({
    state: -1,
    placeToVisit: "",
    startDate: dateNowChange(Date.now()),
    endDate: "",
    searchData: "",
  });

  const { data, isLoading } = useQuery(
    [
      "getLog",
      {
        visitSiteIndex,
        page: page,
        pageRange: 10,
        state: searchOption.state,
        startDate: searchOption.startDate,
        endDate: searchOption.endDate,
        searchData: searchOption.searchData,
        placeToVisit: searchOption.placeToVisit,
      },
    ],
    apiGetLog
  );

  const totalItemsCount = data?.totalCnt;
  const handlePageChange = (page) => {
    setPage(page);
  };

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
          <SearchData
            searchOption={searchOption}
            setSearchOption={setSearchOption}
          />
        </div>

        {/* 테이블 */}
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
              {!data ? (
                <tr>
                  <td colSpan={8}>
                    <div>해당하는 데이터가 없습니다.</div>
                  </td>
                </tr>
              ) : (
                data?.logs?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.placeToVisit}</td>
                    <td>{nameHidden(item.visitorName)}</td>
                    <td>{item.carNumber}</td>
                    <td>{dateFormat(item.regDate)}</td>
                    <td>{item.purposeOfVisit}</td>
                    <td>{item.managerName}</td>
                    <td></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
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
