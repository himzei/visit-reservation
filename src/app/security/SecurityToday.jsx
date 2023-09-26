import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import useVisitSite from "../../hooks/useVisitSite";
import { SECURITY_LIST } from "../../lib/menuList";
import { apiGetVisitReservation } from "../../api";
import { Button, Input } from "@chakra-ui/react";
import { nameHidden } from "../../utils/nameHidden";
import { dateFormat } from "../../utils/dateFormat";
import { timeEnd, timeStart } from "../../utils/timeStatEnd";

export default function SecurityToday() {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const { data } = useQuery(
    [
      "getVisitReservation",
      {
        visitSiteIndex,
        startDate: timeStart(),
        endDate: timeEnd(),
        page: 1,
        pageRange: 10,
        state: 3,
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
            {/* <div className="security-search__label">검색어</div> */}
            <Input type="text" />
            <Button colorScheme="blue" width="100px">
              검색
            </Button>
          </div>
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
              {data?.resevations?.map((item, i) => (
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
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  );
}
