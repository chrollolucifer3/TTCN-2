import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

const { Option } = Select;

const ReusableSelect = ({ options, placeholder, onChange, value, style }) => {
  return (
    <Select
      style={{ width: 200, ...style }}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      allowClear
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

ReusableSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
};

ReusableSelect.defaultProps = {
  placeholder: "Select an option",
  onChange: () => {},
  value: null,
  style: {},
};

export default ReusableSelect;
