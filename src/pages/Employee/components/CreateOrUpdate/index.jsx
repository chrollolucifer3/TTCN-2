import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputRES from "../../../../components/UI/Input";
import ButtonRES from "../../../../components/UI/Button";
import _ from "lodash";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral";
import SelectCustom from "../../../../components/UI/Select";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorCreateOrUpdateEmployee,
  setVisibleModalCreateOrUpdateEmployee,
} from "../../../../states/modules/employee";
import {
  handleCreateEmployee,
  handleUpdateEmployee,
} from "../../../../api/employee";

CreateOrUpdate.prototype = {
  isModalOpen: PropTypes.bool.isRequired,
  configModal: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

CreateOrUpdate.defaultProps = {
  isModalOpen: false,
  textBtnConfirm: "OK",
  configModal: {
    title: "Title",
    type: "CREATE",
  },
};

function CreateOrUpdate(props) {
  let { employee, configModal } = props;
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    username: "",
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    position: "",
    roleName: "",
    password: "",
  });
  const visibleModalCreateOrUpdateEmployee = useSelector(
    (state) => state.employee.visibleModalCreateOrUpdateEmployee
  );
  const isLoadingBtnCreateOrUpdateEmployee = useSelector(
    (state) => state.employee.isLoadingBtnCreateOrUpdateEmployee
  );
  const errorCreateOrUpdateEmployee = useSelector(
    (state) => state.employee.errorCreateOrUpdateEmployee
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateEmployee]);

  useEffect(() => {
    dispatch(
      setErrorCreateOrUpdateEmployee({
        username: "",
        full_name: "",
        email: "",
        phone_number: "",
        address: "",
        position: "",
        roleName: "",
        password: "",
      })
    );
  }, [dataCreateOrUpdate, dispatch]);

  useEffect(() => {
    setDataCreateOrUpdate({
      full_name: employee.full_name,
      email: employee.email,
      phone_number: employee.phone_number,
      address: employee.address,
      position: employee.position,
      roleName: employee.roleName,
    });
  }, [employee]);

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      username: "",
      full_name: "",
      email: "",
      phone_number: "",
      address: "",
      position: "",
      roleName: "",
      password: "",
    });
  };

  const handleChangeInput = (valueInput, type) => {
    let value;

    // Nếu type là "roleName", lấy giá trị của roleName, nếu không lấy giá trị từ input
    if (type === "roleName") {
      value = valueInput ? valueInput : dataCreateOrUpdate.roleName;
    } else {
      value = valueInput.target.value;
    }

    let data = _.cloneDeep(dataCreateOrUpdate); // Clone để không thay đổi trực tiếp dữ liệu cũ
    data[type] = value; // Cập nhật giá trị

    setDataCreateOrUpdate(data); // Cập nhật state mới
  };

  const validateBlur = (type) => {
    let validate = isValidate(
      dataCreateOrUpdate,
      type,
      errorCreateOrUpdateEmployee
    );
    dispatch(setErrorCreateOrUpdateEmployee(validate.error));
    return validate.isError;
  };

  const handleConfirmCreateOrUpdateUser = () => {
    let dataToSend = {
      full_name: dataCreateOrUpdate.full_name,
      phone_number: dataCreateOrUpdate.phone_number,
      address: dataCreateOrUpdate.address,
      position: dataCreateOrUpdate.position,
      roleName: dataCreateOrUpdate.roleName,
    };

    if (configModal.type === "CREATE") {
      dataToSend.email = dataCreateOrUpdate.email;
      dataToSend.username = dataCreateOrUpdate.username;
      dataToSend.password = dataCreateOrUpdate.password;
    }

    if (!configModal.type === "UPDATE") {
      // Loại bỏ các trường không cần thiết trong update
      delete dataToSend.email;
      delete dataToSend.username;
    }

    const validate = handleCheckValidateConfirm(
      dataToSend,
      errorCreateOrUpdateEmployee
    );
    dispatch(setErrorCreateOrUpdateEmployee(validate.dataError));

    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateEmployee(dataToSend)); // Gửi dữ liệu JSON
      } else {
        dispatch(handleUpdateEmployee(dataToSend, employee.id)); // Gửi dữ liệu JSON
      }
    }
  };

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateEmployee}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateEmployee(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        {/* Render input username nếu là chế độ CREATE */}
        {configModal.type === "CREATE" && (
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Username *</div>
            <InputRES
              type={"text"}
              placeholder={"Enter username..."}
              onChange={(e) => handleChangeInput(e, "username")}
              onBlur={() => validateBlur("username")}
              value={dataCreateOrUpdate.username}
              error={errorCreateOrUpdateEmployee.username}
            />
          </div>
        )}
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Name *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter name..."}
            onChange={(e) => handleChangeInput(e, "full_name")}
            onBlur={() => validateBlur("full_name")}
            value={dataCreateOrUpdate.full_name}
            error={errorCreateOrUpdateEmployee.full_name}
          />
        </div>

        {configModal.type === "CREATE" && (
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Email *</div>
            <InputRES
              type={"text"}
              placeholder={"Enter email..."}
              onChange={(e) => handleChangeInput(e, "email")}
              onBlur={() => validateBlur("email")}
              value={dataCreateOrUpdate.email}
              error={errorCreateOrUpdateEmployee.email}
            />
          </div>
        )}
        
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Phone *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter phone..."}
            onChange={(e) => handleChangeInput(e, "phone_number")}
            onBlur={() => validateBlur("phone_number")}
            value={dataCreateOrUpdate.phone_number}
            error={errorCreateOrUpdateEmployee.phone_number}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Address *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter address..."}
            onChange={(e) => handleChangeInput(e, "address")}
            onBlur={() => validateBlur("address")}
            value={dataCreateOrUpdate.address}
            error={errorCreateOrUpdateEmployee.address}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Position *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter position..."}
            onChange={(e) => handleChangeInput(e, "position")}
            onBlur={() => validateBlur("position")}
            value={dataCreateOrUpdate.position}
            error={errorCreateOrUpdateEmployee.position}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Role *</div>
          <SelectCustom
            onChange={(e) => handleChangeInput(e, "roleName")}
            value={dataCreateOrUpdate.roleName}
            options={[
              // Tạo mảng options
              { value: "STAFF", label: "STAFF" },
              { value: "MANAGER", label: "MANAGER" },
              { value: "ADMIN", label: "ADMIN" },
              { value: "CASHIER", label: "CASHIER" },
            ]}
            onBlur={() => validateBlur("roleName")}
            error={errorCreateOrUpdateEmployee.roleName}
          />
        </div>

        {configModal.type === "CREATE" ? (
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Password *</div>
            <InputRES
              type={"password"}
              placeholder={"Enter password..."}
              onChange={(e) => handleChangeInput(e, "password")}
              onBlur={() => validateBlur("password")}
              value={dataCreateOrUpdate.password}
              error={errorCreateOrUpdateEmployee.password}
            />
          </div>
        ) : (
          ""
        )}

        <div className={styles.btnWrap}>
          <ButtonRES
            textBtn={"Save"}
            loading={isLoadingBtnCreateOrUpdateEmployee}
            onClick={() => handleConfirmCreateOrUpdateUser()}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      </div>
    </ModalGeneral>
  );
}

export default CreateOrUpdate;
