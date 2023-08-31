import "./SearchDate.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchDate() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="search-date">
      <span>예약일시 기간</span>
      <DatePicker
        className="date-picker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <div className="divider">~</div>

      <DatePicker
        className="date-picker"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
      />
      <select>
        <option className="select-default" value="">
          기간선택
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
