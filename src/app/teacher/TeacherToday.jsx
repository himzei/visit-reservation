import "./TeacherToday.css";
import React, { useState,useEffect } from "react";
import { TEACHER_LIST } from "../../lib/menuList";
import Layout from "../../components/Layout";
import { nameHidden } from "../../utils/nameHidden";
import { dateFormat } from "../../utils/dateFormat";
import { useQuery } from "react-query";
import { apiGetVisitReservation } from "../../api";
import useVisitSite from "../../hooks/useVisitSite";
import { timeEnd, timeStart } from "../../utils/timeStatEnd";
import SearchLocation from "../../components/SearchLocation";
import SearchDate from "../../components/SearchDate";
import SearchKeyword from "../../components/SearchKeyword";
import Pagination from "react-js-pagination";
import { HStack, Spinner } from "@chakra-ui/react";
import useTokenLogin from "../../hooks/useTokenLogin";

export default function TeacherToday() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;
  const { data: userData } = useTokenLogin();
  console.log(userData);

  const [page, setPage] = useState(1);

  const [initialLogin, setInitialLogin] = useState(localStorage.getItem("initialLogin"));

  // 로컬 스토리지에서 initialLogin 값이 변경되었을 때 감지
  useEffect(() => {
    const loginStatus = localStorage.getItem("initialLogin");
    setInitialLogin(loginStatus);
  }, []);

  const [searchOption, setSearchOption] = useState({
    state: -1,
    placeToVisit: "",
    startDate: timeStart(),
    endDate: timeEnd(),
    searchValue: "",
  });

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

  return (
    <Layout menu={TEACHER_LIST}>
    {initialLogin !== "4" ? (
      <div className="teacher-today">
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
        {/* <SearchStatus
          searchOption={searchOption}
          setSearchOption={setSearchOption}
        /> */}
        <SearchKeyword
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
                  <td>{totalItemsCount - i - (page - 1) * 10}</td>
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
    ) : null}
    </Layout>
  );
}
