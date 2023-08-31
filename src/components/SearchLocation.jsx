import "./SearchLocation.css";

export default function SearchLocation() {
  return (
    <div className="search-location">
      <span>방문지</span>
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
