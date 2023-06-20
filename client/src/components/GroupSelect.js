import React from "react";
import Select from "react-select";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const GroupSelect = ({
  options,
  value,
  onChange,
  name,
  placeholder,
  isMulti,
}) => {
  return (
    <React.Fragment>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        formatGroupLabel={formatGroupLabel}
        isClearable={true}
        isSearchable={true}
        required={true}
        name={name}
        isMulti={isMulti}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder={placeholder}
      />
    </React.Fragment>
  );
};

export default GroupSelect;
