import { useQuery } from "react-query";
import useVisitSite from "../hooks/useVisitSite";
import "./SearchLocation.css";
import { apiGetVisitSite } from "../api";

export default function SearchLocation({ setSearchOption, searchOption }) {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  // 방문지 불러오기
  const { data: dataVisitSite } = useQuery(
    ["getVisitSite", visitSiteIndex],
    apiGetVisitSite
  );

  const handleChange = (e) => {
    setSearchOption({ ...searchOption, placeToVisit: e.target.value });
  };

  return (
    <div className="search-location">
      <span>방문지</span>
      <select onChange={(e) => handleChange(e)}>
        <option value="">선택해주세요</option>
        {dataVisitSite?.placeToVisits?.map((item, index) => (
          <option key={index} value={item.title}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}
