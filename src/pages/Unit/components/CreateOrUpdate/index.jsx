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
  setErrorCreateOrUpdateUnit,
  setVisibleModalCreateOrUpdateUnit,
} from "../../../../states/modules/unit";
import {
  handleCreateUnit,
  handleUpdateUnit
} from "../../../../api/unit";

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
  let { unit, configModal } = props;
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    name: "",
    description: "",
  });
  const visibleModalCreateOrUpdateUnit = useSelector(
    (state) => state.unit.visibleModalCreateOrUpdateUnit
  );
  const isLoadingBtnCreateOrUpdateUnit = useSelector(
    (state) => state.unit.isLoadingBtnCreateOrUpdateUnit
  );
  const errorCreateOrUpdateUnit = useSelector(
    (state) => state.unit.errorCreateOrUpdateUnit
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateUnit]);

  useEffect(() => {
    dispatch(
      setErrorCreateOrUpdateUnit({
        name: "",
        description: "",
      })
    );
  }, [dataCreateOrUpdate, dispatch]);

  useEffect(() => {
    setDataCreateOrUpdate({
        name: unit.name,
        description: unit.description,
    });
  }, [unit]);

  const handleReloadData = () => {
    setDataCreateOrUpdate({
        name: "",
        description: "",
    });
  };

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataCreateOrUpdate);
    data[type] = value;
    setDataCreateOrUpdate(data);
  };

  const validateBlur = (type) => {
    let validate = isValidate(
      dataCreateOrUpdate,
      type,
      errorCreateOrUpdateUnit
    );
    dispatch(setErrorCreateOrUpdateUnit(validate.error));
    return validate.isError;
  };

  const handleConfirmCreateOrUpdateUnit = () => {
    let dataToSend = {
        name: dataCreateOrUpdate.name,
        description: dataCreateOrUpdate.description,
    };

    const validate = handleCheckValidateConfirm(
      dataToSend,
      errorCreateOrUpdateUnit
    );
    dispatch(setErrorCreateOrUpdateUnit(validate.dataError));

    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateUnit(dataToSend)); // Gửi dữ liệu JSON
      } else {
        dispatch(handleUpdateUnit(dataToSend, unit.id)); // Gửi dữ liệu JSON
      }
    }
  };

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateUnit}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateUnit(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        {/* Render input username nếu là chế độ CREATE */}
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Name *</div>
            <InputRES
              type={"text"}
              placeholder={"Enter name..."}
              onChange={(e) => handleChangeInput(e, "name")}
              onBlur={() => validateBlur("name")}
              value={dataCreateOrUpdate.name}
              error={errorCreateOrUpdateUnit.name}
            />
          </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Description *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter description..."}
            onChange={(e) => handleChangeInput(e, "description")}
            onBlur={() => validateBlur("description")}
            value={dataCreateOrUpdate.description}
            error={errorCreateOrUpdateUnit.description}
          />
        </div>

        <div className={styles.btnWrap}>
          <ButtonRES
            textBtn={"Create"}
            loading={isLoadingBtnCreateOrUpdateUnit}
            onClick={() => handleConfirmCreateOrUpdateUnit()}
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
