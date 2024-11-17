import React from 'react';
import {Switch} from 'antd';
import PropTypes from "prop-types";
import './styles.scss';

SwitchRES.prototype = {
  onChange: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired
}

SwitchRES.defaultProps = {
  status: false,
  disabled: false
}

function SwitchRES(props) {
  return (
    <div className={`${props.type !== "TABLE" ? 'switch-style-custom' : 'switch-table-style-custom'}`}>
      <Switch
        size={"small"}
        disabled={props.disabled}
        checked={props.status}
        onChange={(e) => props.onChange(e)}
      />
    </div>

  );
}

export default SwitchRES
