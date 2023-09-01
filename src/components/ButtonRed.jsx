import "./ButtonRed.css";
import React from "react";

export default function ButtonRed({ text, LeftIcon, RightIcon }) {
  return (
    <div className="button-red">
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
