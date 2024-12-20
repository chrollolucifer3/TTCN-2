import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {Pagination, Table} from 'antd';
import PropTypes from "prop-types";

TableRES.prototype = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  rowKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

TableRES.defaultProps = {
  columns: [],
  dataSource: [],
  loading: false,
  rowKey: 'id',
  onChange: () => {}
}

function TableRES(props) {
  let {columns, dataSource, loading, rowKey, pagination, onChangeCurrentPage, onChange} = props

  return (
    <div className={styles.tableWrap}>
      <Table
        className={`table-custom ${styles.table}`}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        onChange={onChange}
        rowKey={rowKey}
      />

      <div className={styles.paginationWrap}>
        <span className={styles.textPagination}>
          <span>Showing {(pagination.perPage * (pagination.currentPage - 1)) + 1} to</span>
          <span> {pagination.totalRecord > (pagination.perPage * pagination.currentPage) ?
            pagination.perPage * pagination.currentPage : pagination.totalRecord }
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

export default TableRES
