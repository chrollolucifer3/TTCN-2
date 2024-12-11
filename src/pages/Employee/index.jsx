import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import TableCustom from "../../components/UI/Table";
import InputRES from "../../components/UI/Input";
import ButtonRES from "../../components/UI/Button";
// import SwitchRES from "../../components/UI/Switch";
// import { FormOutlined, DeleteOutlined, CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";

import { Tag } from "antd";

import CreateOrUpdate from "./components/CreateOrUpdate";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import {
  getListEmployee,
  handleDeleteEmployee,
} from "../../api/employee";
import {
  setVisibleModalCreateOrUpdateEmployee,
  setVisibleModalDeleteEmployee,
} from "../../states/modules/employee";
import _ from "lodash";


function Employee() {
  const authUser = useSelector((state) => state.auth.authUser);
  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text, record) => <span> {record.full_name}</span>,
      defaultSortOrder: "",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => <span>{record.email}</span>,
      defaultSortOrder: "",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (text, record) => <span>{record.phone_number}</span>,
      defaultSortOrder: "",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record) => <span>{record.address}</span>,
      defaultSortOrder: "",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (text, record) => <span>{record.position}</span>,
      defaultSortOrder: "",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "RoleName",
      render: (text, record) => <span>{record.roleName}</span>,
      defaultSortOrder: "",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <>
          {record.status === "active" ? (
            <Tag color="green">Active</Tag>
          ) : (
            <Tag color="red">Block</Tag>
          )}
        </>
      ),
      defaultSortOrder: "",
      sorter: (a, b) => a.age - b.age,
      // filters: [
      //   {
      //     text: "Active",
      //     value: "active",
      //   },
      //   {
      //     text: "Block",
      //     value: "blocked",
      //   },
      // ],
      // onFilter: (value, record) => record.status.startsWith(value),
    },
    {
      title: "Actions",
      key: "action",
      fixed: "right",
      align: "center",
      width: "80px",
      render: (text, record) => (
        <>
          {(authUser.id !== record.id && authUser.roleName !== "ADMIN") ? (
            <div className={styles.btnAction}>
              <div
                onClick={() => handleEdit(record)}
                className={styles.btnWrap}
                title="Update"
              >
                <FormOutlined />
              </div>
              <div
                onClick={() => handleShowConfirmDelete(record)}
                className={styles.btnWrap}
                title="Delete"
              >
                <DeleteOutlined />
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

  const employees = useSelector((state) => state.employee.employees);
  const isLoadingTableEmployee = useSelector(
    (state) => state.employee.isLoadingTableEmployee
  );
  const paginationListEmployee = useSelector(
    (state) => state.employee.paginationListEmployee
  );
  const visibleModalDeleteEmployee = useSelector(
    (state) => state.employee.visibleModalDeleteEmployee
  );

  const [employee, setEmployee] = useState({});
  const [configModal, setConfigModal] = useState({
    title: "Create user",
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
    dispatch(getListEmployee(dataFilter));
  }, [dataFilter, dispatch]);

  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateEmployee(true));
    setConfigModal({
      title: "Create user",
      type: "CREATE",
    });
  };

  const handleEdit = (employee) => {
    let employeeSelect = _.cloneDeep(employee);
    setEmployee(employeeSelect);
    dispatch(setVisibleModalCreateOrUpdateEmployee(true));
    setConfigModal({
      title: "Update user",
      type: "UPDATE",
    });
  };

  const handleShowConfirmDelete = (employee) => {
    let employeeSelect = _.cloneDeep(employee);
    setEmployee(employeeSelect);
    dispatch(setVisibleModalDeleteEmployee(true));
  };

  const handleConfirmDeleteEmployee = () => {
    dispatch(handleDeleteEmployee(employee.id));
  };

  const changeCurrentPage = (page) => {
    setDataFilter({ ...dataFilter, page: page });
  };

  const handleSearch = (e) => {
    setDataFilter({ ...dataFilter, keySearch: e.target.value });
  };

  const onChange = (pagination, filters, sorter) => {
    // // Lấy các giá trị bộ lọc cho cột 'status'
    // let status = "";
    // if (filters.status && filters.status.length === 1) {
    //   status = filters.status[0];
    // }
    // // Cập nhật trạng thái dataFilter với thứ tự sắp xếp và bộ lọc
    setDataFilter({
      ...dataFilter,
      order: sorter.order
        ? sorter.order === "descend"
          ? "desc"
          : "asc"
        : null,
      column: sorter.field ? sorter.field : null,
      // status: status, // Thêm bộ lọc trạng thái vào trạng thái dataFilter
    });
    // console.log("dataFilter", dataFilter);
    
  };

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.headerMainWrap}>
            <span className={styles.title}>
              Total records ({paginationListEmployee.totalRecord})
            </span>
          </div>

          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputRES
                placeholder="Search by name, email or phone"
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
            loading={isLoadingTableEmployee}
            columns={columns}
            dataSource={employees}
            rowKey={(record) => record.id}
            pagination={paginationListEmployee}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        <CreateOrUpdate employee={employee} configModal={configModal} />

        <ModalConfirm
          isModalOpen={visibleModalDeleteEmployee}
          title={`Do you want delete ${employee.full_name}?`}
          textBtnConfirm="Delete"
          description={`Are you sure you want to delete ${employee.full_name}? Your action can not be undone.`}
          onClose={() => dispatch(setVisibleModalDeleteEmployee(false))}
          onConfirm={() => handleConfirmDeleteEmployee()}
        />
      </div>
    </MainLayout>
  );
}

export default Employee;
