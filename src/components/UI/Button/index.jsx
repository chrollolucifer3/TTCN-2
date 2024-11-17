import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

ButtonRES.prototype = {
  onClick: PropTypes.func.isRequired,
  textBtn: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  danger: PropTypes.bool,
};

ButtonRES.defaultProps = {
  textBtn: "OK",
  style: {},
  type: "",
  loading: false,
  disabled: false,
  danger: false,
  onClick: () => {},
};

function ButtonRES(props) {
  const type = props.textBtn === "Cancel" ? "" : "primary";

  return (
    <div className={styles.btnWrap}>
      <Button
        type={type}
        disabled={props.disabled}
        loading={props.loading}
        className={styles.btn}
        danger={props.danger}
        // style={style || ''}
        onClick={() => props.onClick()}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        {props.textBtn}
      </Button>
    </div>
  );
}

export default ButtonRES;
