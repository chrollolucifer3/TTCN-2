import React from "react";
import styles from "./styles.module.scss";
import "./styles.scss";
import PropTypes from "prop-types";
import { List, Pagination } from "antd";
import CardRES from "../Card";

ListRES.prototype = {
  dataSource: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  rowKey: PropTypes.string.isRequired,
  grid: PropTypes.object,
  actions: PropTypes.array,
};

ListRES.defaultProps = {
  dataSource: [],
  loading: false,
  rowKey: "id",
  renderItem: () => {},
  actions: [],
};

function ListRES(props) {
  let { dataSource, loading, rowKey, actions, grid, pagination, onChangeCurrentPage } =
    props;
    
  return (
    <div className={styles.listWrap}>
      <List
        dataSource={dataSource}
        loading={loading}
        rowKey={rowKey}
        pagination={false}
        actions={actions}
        grid={grid}
        renderItem={(item) => (
          <List.Item>
            <CardRES
              title={item.name}
              description={item.description}
              actions={actions}
            ></CardRES>
          </List.Item>
        )}
      />
      <div className={styles.paginationWrap}>
        <span className={styles.textPagination}>
          <span>
            Showing {pagination.perPage * (pagination.currentPage - 1) + 1} to
          </span>
          <span>
            {" "}
            {pagination.totalRecord >
            pagination.perPage * pagination.currentPage
              ? pagination.perPage * pagination.currentPage
              : pagination.totalRecord}
          </span>
          <span> of {pagination.totalRecord} entries</span>
        </span>

        <Pagination
          current={pagination.currentPage}
          total={pagination.totalRecord}
          pageSize={pagination.perPage}
          onChange={onChangeCurrentPage}
        />
      </div>
    </div>
  );
}

export default ListRES;
