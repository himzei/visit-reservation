import "./SearchCategory.css";
import React from "react";

export default function SearchCategory() {
  return (
    <div className="search-category">
      <span>분류</span>
      <select>
        <option className="select-default" value="">
          선택
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
