import "./SearchKeyword.css";

export default function SearchData({ text, searchOption, setSearchOption }) {
  const handleChange = (e) => {
    setSearchOption({ ...searchOption, searchData: e.target.value });
  };
  return (
    <div className="search-keyword">
      <span>{text}</span>
      <input
        onChange={(e) => handleChange(e)}
        type="text"
        placeholder="방문객명"
      />
    </div>
  );
}
