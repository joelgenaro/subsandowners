import React from "react";

const SelectOptions = ({ datas, defaultValue }) => {
  return (
    <React.Fragment>
      {datas.map((data, key) => (
        <option
          key={key}
          value={data.value}
          selected={data.value === defaultValue ? true : false}
        >
          {data.value}
        </option>
      ))}
    </React.Fragment>
  );
};

export default SelectOptions;
