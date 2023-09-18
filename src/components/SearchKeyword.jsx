import "./SearchKeyword.css";

export default function SearchKeyword({ text, searchOption, setSearchOption }) {
  const handleChange = (e) => {
    setSearchOption({ ...searchOption, searchValue: e.target.value });
  };
  return (
    <div className="search-keyword">
      <span>{text}</span>
      <input onChange={(e) => handleChange(e)} type="text" placeholder="전체" />
    </div>
  );
}
