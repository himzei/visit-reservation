import { useState } from "react";
import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import useVisitSite from "../../hooks/useVisitSite";
import { SECURITY_LIST } from "../../lib/menuList";
import { apiGetVisitReservation } from "../../api";
import { nameHidden } from "../../utils/nameHidden";
import { dateFormat } from "../../utils/dateFormat";
import { timeEnd, timeStart } from "../../utils/timeStatEnd";
import Pagination from "react-js-pagination";

export default function SecurityToday() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const [page, setPage] = useState(1);

  const { data } = useQuery(
    [
      "getVisitReservation",
      {
        visitSiteIndex,
        startDate: timeStart(),
        endDate: timeEnd(),
        page: page,
        pageRange: 10,
        state: 3,
        searchValue: "",
        placeToVisit: "",
      },
    ],
    apiGetVisitReservation
  );
  const totalItemsCount = data?.totalCnt;
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <Layout menu={SECURITY_LIST}>
      <div className="security-container">
        <section>
          {/* 테이블 */}
          <table>
            <thead>
              <tr>
                <td>No</td>
                <td>방문지</td>
                <td>방문객명</td>

                <td>차량번호</td>
                <td>방문예정일</td>
                <td>목적</td>

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
                    <td>{item.placeToVisit}</td>
                    <td>{nameHidden(item.visitorName)}</td>

                    <td>{item.carNumber}</td>

                    <td>{dateFormat(item.reservationDate)}</td>
                    <td>{item.purposeOfVisit}</td>
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
                            return;
                        }
                      })()}
                    </td>
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
        </section>
      </div>
    </Layout>
  );
}
