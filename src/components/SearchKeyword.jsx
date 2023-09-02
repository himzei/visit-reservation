import "./SearchKeyword.css";

export default function SearchKeyword({ text }) {
  return (
    <div className="search-keyword">
      <span>{text}</span>
      <input type="text" placeholder="전체" />
    </div>
  );
}
