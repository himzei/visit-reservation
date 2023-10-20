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
import { CSVLink } from "react-csv";
import { useQuery } from "react-query";
import { apiGetLog } from "../../api";
import useVisitSite from "../../hooks/useVisitSite";
import { dateFormat } from "../../utils/dateFormat";
import { dateNowChange } from "../../utils/dateNowChange";
import { nameHidden } from "../../utils/nameHidden";
import Pagination from "react-js-pagination";

export default function AdminHistory() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [page, setPage] = useState(1);

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
        page: page,
        pageRange: 10,
        placeToVisit: searchOption.placeToVisit,
        searchData: searchOption.searchData,
      },
    ],
    apiGetLog
  );

  const totalItemsCount = data?.totalCnt;
  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleCSVDownload = () => {
    const downloadCheck = window.confirm("CSV파일 다운로드 하시겠습니까?");
    if (!downloadCheck) return false;
  };

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
          {/* <AllPass title="일괄승인" /> */}
          <CSVLink
            className="btn-download"
            onClick={handleCSVDownload}
            data={data?.logs || []}
            filename="downloads.csv"
          >
            CSV 다운로드
          </CSVLink>
        </div>
        {/* 테이블 */}
        <table>
          <thead>
            <tr>
              <td>No</td>
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
                  <td>{i + 1 + (page - 1) * 10}</td>
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
