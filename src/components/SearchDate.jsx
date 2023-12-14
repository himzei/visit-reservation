import "./SearchDate.css";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  dateChange,
  dateChangeEnd,
  dateChangeStart,
} from "../utils/dateChange";

export default function SearchDate({
  searchOption,
  setSearchOption,
  size,
  title = "예약일시 시간",
}) {
  const calcMonth = (value) => {
    const currentDate = new Date();
    let afterDate = new Date(currentDate);
    afterDate.setMonth(currentDate.getMonth() - parseInt(value));
    return afterDate;
  };

  const [startDate, setStartDate] = useState(calcMonth(1));
  const [endDate, setEndDate] = useState(new Date());

  const handleChange = (e) => {
    const duration = e.target.value;
    setStartDate(calcMonth(duration));
    setEndDate(new Date());
  };

  useEffect(() => {
    setSearchOption({
      ...searchOption,
      startDate: dateChangeStart(startDate),
      endDate: dateChangeEnd(endDate),
    });
  }, [startDate, endDate]);

  return (
    <div className="search-date">
      <span>{title}</span>
      <DatePicker
        className={`date-picker ${
          size === "large" ? "large-datepicker" : null
        }`}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
      />
      <div className="divider">~</div>

      <DatePicker
        className={`date-picker ${
          size === "large" ? "large-datepicker" : null
        }`}
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        dateFormat="yyyy-MM-dd"
      />
      <select onChange={(e) => handleChange(e)}>
        <option value={1} className="select-default">
          기간선택
        </option>
        <option value={3}>3개월전~현재</option>
        <option value={6}>6개월전~현재</option>
        <option value={9}>9개월전~현재</option>
        <option value={12}>12개월전~현재</option>
      </select>
    </div>
  );
}
