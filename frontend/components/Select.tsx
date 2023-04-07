import React from "react";

export interface ISelect {
  placeholder: string;
  label: string;
}

const Select: React.FC<ISelect> = ({ label, placeholder }) => {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <select
        className="w-full max-w-xs select-primary select select-sm"
        onChange={(e) => console.log(e.target.value)}
      >
        <option disabled selected>
          {placeholder}
        </option>
        <option>Game of Thrones</option>
        <option>Lost</option>
        <option>Breaking Bad</option>
        <option>Walking Dead</option>
      </select>
    </>
  );
};

export default Select;
