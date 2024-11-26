import React from "react";
import styles from "./styles.module.scss";
import "./styles.scss";
import PropTypes from "prop-types";
import { Card } from 'antd';

CardRES.prototype = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.node,
  loading: PropTypes.bool,
  cover: PropTypes.node,
  bordered: PropTypes.bool,
  description: PropTypes.node,
};

CardRES.defaultProps = {
  title: "",
  actions: [],
  loading: false,
  cover: "",
  bordered: false,
  description: "",
};

function CardRES(props) {
  let { title, actions, loading, cover, bordered, description } = props;
  
  return (
    <div className={styles.cardWrap}>
      <Card
        title={title}
        actions={actions}
        loading={loading}
        cover={cover}
        bordered={bordered}
      />
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
}

export default CardRES;