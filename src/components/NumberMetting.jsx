import { useQuery } from "react-query";
import { apiManagerInterviewStatis, apiVisitorInterviewStatis } from "../api";
import useVisitSite from "../hooks/useVisitSite";
import { mobileDash } from "../utils/mobileDash";

export default function NumberMeeting({ searchOption, setSearchOption }) {
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  // 담당자 면담 통계
  const { data: managerInterview } = useQuery(
    [
      "managerInterviewStatis",
      {
        visitSiteIndex,
        startDate: searchOption.startDate,
        endDate: searchOption.endDate,
      },
    ],
    apiManagerInterviewStatis
  );

  // 방문객 면담 통계
  const { data: visitorInterview } = useQuery(
    [
      "visitorInterviewStatis",
      {
        visitSiteIndex,
        startDate: searchOption.startDate,
        endDate: searchOption.endDate,
      },
    ],
    apiVisitorInterviewStatis
  );

  return (
    <div>
      <section>
        <div className="reg-title">
          {/* <img src={PhotoIcon} alt="icon2" /> */}
          <h2>기간별 담당자 및 방문객 면담횟수</h2>
        </div>
        {/* <SearchDate
          searchOption={searchOption}
          setSearchOption={setSearchOption}
          title=""
        /> */}
        <div className="interview-container">
          <div>
            <h3>담당자</h3>
            <table className="interview-statistics">
              <thead>
                <tr>
                  <td>No</td>
                  <td>담당자</td>
                  <td>방문횟수</td>
                </tr>
              </thead>
              <tbody>
                {managerInterview?.managerInterviews?.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.accountName}</td>
                    <td>{item.interviewCnt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>방문객</h3>
            <table className="interview-statistics">
              <thead>
                <tr>
                  <td>No</td>
                  <td>이름</td>
                  <td>연락처</td>
                  <td>방문횟수</td>
                </tr>
              </thead>
              <tbody>
                {visitorInterview?.visitorInterviews?.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.visitorName}</td>
                    <td>{mobileDash(item.visitorTel)}</td>
                    <td>{item.interviewCnt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
