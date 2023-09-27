import "./SearchDate.css";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateChange } from "../utils/dateChange";

export default function SearchDate({ searchOption, setSearchOption }) {
  const calcMonth = (value) => {
    const currentDate = new Date();
    let afterDate = new Date(currentDate);
    afterDate.setMonth(currentDate.getMonth() + parseInt(value));
    return afterDate;
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(calcMonth(1));

  const handleChange = (e) => {
    const duration = e.target.value;
    setEndDate(calcMonth(duration));
  };

  useEffect(() => {
    setSearchOption({
      ...searchOption,
      startDate: dateChange(startDate),
      endDate: dateChange(endDate),
    });
  }, [startDate, endDate]);

  return (
    <div className="search-date">
      <span>예약일시 기간</span>
      <DatePicker
        className="date-picker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy/MM/dd"
      />
      <div className="divider">~</div>

      <DatePicker
        className="date-picker"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        dateFormat="yyyy/MM/dd"
      />
      <select onChange={(e) => handleChange(e)}>
        <option value={1} className="select-default">
          기간선택
        </option>
        <option value={3}>3개월</option>
        <option value={6}>6개월</option>
        <option value={9}>9개월</option>
        <option value={12}>12개월</option>
      </select>
    </div>
  );
}
