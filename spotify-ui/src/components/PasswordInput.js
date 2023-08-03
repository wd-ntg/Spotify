import React from "react";

export default function PasswordInput({
  label,
  placeholder,
  className,
  value,
  setValue,
}) {
  return (
    <div className={`w-full flex flex-col space-y-2 ${className}`}>
      <label for={label} className="font-semibold w-[324px] text-left mt-4">
        {label}
      </label>
      <input
        type="password"
        placeholder={placeholder}
        id={label}
        className="p-2 border-gray-500 placeholder-gray-800 border-2 rounded-md focus:outline-emerald-600"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </div>
  );  
}
