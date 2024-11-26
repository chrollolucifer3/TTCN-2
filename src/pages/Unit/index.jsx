import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import TableCustom from "../../components/UI/Table";
import InputRES from "../../components/UI/Input";
import ButtonRES from "../../components/UI/Button";
import { FormOutlined } from "@ant-design/icons";

import CreateOrUpdate from "./components/CreateOrUpdate";
import { useDispatch, useSelector } from "react-redux";
import {
  getListUnit,
} from "../../api/unit";
import {
  setVisibleModalCreateOrUpdateUnit,
} from "../../states/modules/unit";
import _ from "lodash";


function Unit() {
  const authUser = useSelector((state) => state.auth.authUser);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <span> {record.name}</span>,
      defaultSortOrder: "",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => <span>{record.description}</span>,
      defaultSortOrder: "",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Actions",
      key: "action",
      fixed: "right",
      align: "center",
      width: "200px",
      render: (text, record) => (
        <>
          {( authUser.roleName !== "ADMIN" && authUser.roleName !== "MANAGER") ? (
            <div className={styles.btnAction}>
              <div
                onClick={() => handleEdit(record)}
                className={styles.btnWrap}
                title="Update"
              >
                <FormOutlined />
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ),
    },
  ];

  const dispatch = useDispatch();

  const units = useSelector((state) => state.unit.units);
  const isLoadingTableUnit = useSelector(
    (state) => state.unit.isLoadingTableUnit
  );
  const paginationListUnit = useSelector(
    (state) => state.unit.paginationListUnit
  );

  const [unit, setUnit] = useState({});
  const [configModal, setConfigModal] = useState({
    title: "Create unit",
    type: "CREATE",
  });
  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    status: "",
    perPage: 10,
    page: 1,
    order: null,
    column: null,
  });

  useEffect(() => {
    dispatch(getListUnit(dataFilter));
  }, [dataFilter, dispatch]);

  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateUnit(true));
    setConfigModal({
      title: "Create unit",
      type: "CREATE",
    });
  };

  const handleEdit = (unit) => {
    let unitSelect = _.cloneDeep(unit);
    setUnit(unitSelect);
    dispatch(setVisibleModalCreateOrUpdateUnit(true));
    setConfigModal({
      title: "Update unit",
      type: "UPDATE",
    });
  };

  const changeCurrentPage = (page) => {
    setDataFilter({ ...dataFilter, page: page });
  };

  const handleSearch = (e) => {
    setDataFilter({ ...dataFilter, keySearch: e.target.value });
  };

  const onChange = (pagination, filters, sorter) => {
    setDataFilter({
        ...dataFilter,
        order: sorter.order ? (sorter.order === "descend" ? "desc" : "asc") : null,
        column: sorter.field ? sorter.field : null,
    });
};

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.headerMainWrap}>
            <span className={styles.title}>
              Total records ({paginationListUnit.totalRecord})
            </span>
          </div>

          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputRES
                placeholder="Search by name or description"
                value={dataFilter.keySearch}
                onChange={(e) => handleSearch(e)}
              />
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M11.78 9.97 9.75 7.94c.473-.788.75-1.707.75-2.69A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25a5.256 5.256 0 0 0 5.25 5.25c.984 0 1.902-.277 2.69-.75l2.03 2.03a.748.748 0 0 0 1.06 0l.75-.75a.749.749 0 0 0 0-1.06ZM5.25 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z"
                    fill="#3D4667"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h12v12H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className={styles.btnWrap}>
              <ButtonRES
                onClick={() => handleCreate()}
                style={{
                  minWidth: "80px",
                  margin: "0",
                  border: "none",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textBtn={"+ Create"}
              ></ButtonRES>
            </div>
          </div>

          <TableCustom
            loading={isLoadingTableUnit}
            columns={columns}
            dataSource={units}
            rowKey={(record) => record.id}
            pagination={paginationListUnit}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        <CreateOrUpdate unit={unit} configModal={configModal} />

      </div>
    </MainLayout>
  );
}

export default Unit;
