import "./SearchStatus.css";

export default function SearchStatus({ searchOption, setSearchOption }) {
  const handleChange = (e) => {
    setSearchOption({ ...searchOption, state: e.target.value });
  };

  return (
    <div className="search-status">
      <span>상태 구분</span>
      <select onChange={(e) => handleChange(e)}>
        <option className="select-default" value={-1}>
          전체
        </option>
        <option className="select-default" value={0}>
          대기중
        </option>
        <option className="select-default" value={1}>
          승인
        </option>
        <option className="select-default" value={2}>
          미승인
        </option>
        <option className="select-default" value={3}>
          방문
        </option>
        <option className="select-default" value={4}>
          예약취소
        </option>
      </select>
    </div>
  );
}
