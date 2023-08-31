import "./SearchStatus.css";

export default function SearchStatus() {
  return (
    <div className="search-status">
      <span>상태 구분</span>
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
