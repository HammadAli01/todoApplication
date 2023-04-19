import React from "react";

export const Custombutton = ({ classname, type, text, handleClick, todo }) => {
  return (
    <button
      type={type}
      className={classname}
      onClick={() => (handleClick ? handleClick(text, todo) : "")}
    >
      {text}
    </button>
  );
};
