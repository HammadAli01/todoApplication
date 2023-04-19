import React from "react";

export const Custominput = ({
  name,
  type,
  placeholder,
  value,
  classname,
  inputHandler,
  label,
  error,
  todo,
  handleBlur,
}) => {
  return (
    <div className="col-xl-3">
      <label className="sr-only">{label}</label>
      <input
        onBlur={(e) => {
          type !== "checkbox" && handleBlur(e);
        }}
        type={type}
        className={classname}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        onChange={(e) => {
          inputHandler(e, todo?.id);
        }}
      />
      <span className="text-danger">{error}</span>
    </div>
  );
};
