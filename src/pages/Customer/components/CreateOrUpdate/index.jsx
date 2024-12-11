import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputRES from "../../../../components/UI/Input";
import ButtonRES from "../../../../components/UI/Button";
import _ from "lodash";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorCreateOrUpdateCustomer,
  setVisibleModalCreateOrUpdateCustomer,
} from "../../../../states/modules/customer";
import {
  handleCreateCustomer,
  handleUpdateCustomer,
} from "../../../../api/customer";

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
  let { customer, configModal } = props;
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    full_name: "",
    phone_number: "",
  });
  const visibleModalCreateOrUpdateCustomer = useSelector(
    (state) => state.customer.visibleModalCreateOrUpdateCustomer
  );
  const isLoadingBtnCreateOrUpdateCustomer = useSelector(
    (state) => state.customer.isLoadingBtnCreateOrUpdateCustomer
  );
  const errorCreateOrUpdateCustomer = useSelector(
    (state) => state.customer.errorCreateOrUpdateCustomer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateCustomer]);

  useEffect(() => {
    dispatch(
      setErrorCreateOrUpdateCustomer({
        full_name: "",
        phone_number: "",
      })
    );
  }, [dataCreateOrUpdate, dispatch]);

  useEffect(() => {
    setDataCreateOrUpdate({
      full_name: customer.full_name,
      phone_number: customer.phone_number,
    });
  }, [customer]);

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      full_name: "",
      phone_number: "",
    });
  };

  const handleChangeInput = (valueInput, type) => {

    let value = valueInput.target.value;

    let data = _.cloneDeep(dataCreateOrUpdate); // Clone để không thay đổi trực tiếp dữ liệu cũ
    data[type] = value; // Cập nhật giá trị

    setDataCreateOrUpdate(data); // Cập nhật state mới
  };

  const validateBlur = (type) => {
    let validate = isValidate(
      dataCreateOrUpdate,
      type,
      errorCreateOrUpdateCustomer
    );
    dispatch(setErrorCreateOrUpdateCustomer(validate.error));
    return validate.isError;
  };

  const handleConfirmCreateOrUpdateCustomer = () => {
    let dataToSend = {
      full_name: dataCreateOrUpdate.full_name,
      phone_number: dataCreateOrUpdate.phone_number,
    };

    const validate = handleCheckValidateConfirm(
      dataToSend,
      errorCreateOrUpdateCustomer
    );
    dispatch(setErrorCreateOrUpdateCustomer(validate.dataError));

    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateCustomer(dataToSend)); // Gửi dữ liệu JSON
      } else {
        dispatch(handleUpdateCustomer(dataToSend, customer.id)); // Gửi dữ liệu JSON
      }
    }
  };

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateCustomer}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateCustomer(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Name *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter name..."}
            onChange={(e) => handleChangeInput(e, "full_name")}
            onBlur={() => validateBlur("full_name")}
            value={dataCreateOrUpdate.full_name}
            error={errorCreateOrUpdateCustomer.full_name}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Phone *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter phone..."}
            onChange={(e) => handleChangeInput(e, "phone_number")}
            onBlur={() => validateBlur("phone_number")}
            value={dataCreateOrUpdate.phone_number}
            error={errorCreateOrUpdateCustomer.phone_number}
          />
        </div>

        <div className={styles.btnWrap}>
          <ButtonRES
            textBtn={"Save"}
            loading={isLoadingBtnCreateOrUpdateCustomer}
            onClick={() => handleConfirmCreateOrUpdateCustomer()}
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
