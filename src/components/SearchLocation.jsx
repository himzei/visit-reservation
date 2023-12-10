import { useQuery } from "react-query";
import useVisitSite from "../hooks/useVisitSite";
import "./SearchLocation.css";
import { apiGetVisitSite } from "../api";
import { useState } from "react";

export default function SearchLocation({ setSearchOption, searchOption }) {
  // VISITSITEINDEX
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  // 방문지 불러오기
  const { data: dataVisitSite } = useQuery(
    ["getVisitSite", visitSiteIndex],
    apiGetVisitSite
  );
  const [firstVisit, setFirstVist] = useState();
  const [dataChild, setDataChild] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setFirstVist(value);
    setSearchOption({ ...searchOption, placeToVisit: value });
    const dataIndex = dataVisitSite?.placeToVisits?.find(
      (item) => item.title === value
    );

    const tempChild = dataVisitSite?.placeToVisits?.filter(
      (item) => item.parentIndex === dataIndex?.placeToVisitIndex
    );
    setDataChild(tempChild);
  };

  const handleChildChange = (e) => {
    const value = e.target.value;
    setSearchOption({
      ...searchOption,
      placeToVisit: `${firstVisit}${value}` || `${firstVisit} ${value}`,
    });
  };

  const dataVisitSiteParent = dataVisitSite?.placeToVisits?.filter(
    (item) => item.parentIndex === -1
  );

  return (
    <div className="search-location">
      <span>방문지</span>
      <select onChange={(e) => handleChange(e)}>
        <option>선택해주세요</option>
        {dataVisitSiteParent?.map((item, index) => (
          <option key={index} value={item.title}>
            {item.title}
          </option>
        ))}
      </select>

      {dataChild && (
        <select onChange={(e) => handleChildChange(e)}>
          <option>선택해주세요</option>
          {dataChild?.map((item, index) => (
            <option key={index} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
