import "./SearchEmploy.css";
import React from "react";

export default function SearchEmploy() {
  return (
    <div className="search-employ">
      <span>재직 여부</span>
      <select>
        <option className="select-default" value="">
          전체
        </option>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <option key={i} value={i}>
              선택옵션 {i}
            </option>
          ))}
      </select>
    </div>
  );
}
