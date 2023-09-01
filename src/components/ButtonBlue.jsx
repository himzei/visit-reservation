import "./ButtonBlue.css";
import React from "react";

export default function ButtonBlue({ text, LeftIcon, RightIcon, onClick }) {
  return (
    <div className="button-custom">
      <button type="submit">
        {LeftIcon && (
          <img className="left-icon" src={LeftIcon} alt="left icon" />
        )}
        {text}
        {RightIcon && (
          <img className="left-icon" src={RightIcon} alt="right icon" />
        )}
      </button>
    </div>
  );
}
