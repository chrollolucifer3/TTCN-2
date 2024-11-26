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
  setErrorCreateOrUpdateCategory,
  setVisibleModalCreateOrUpdateCategory,
} from "../../../../states/modules/category";
import {
  handleCreateCategory,
  handleUpdateCategory,
} from "../../../../api/category";

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
  let { category, configModal } = props;
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    name: "",
  });
  const visibleModalCreateOrUpdateCategory = useSelector(
    (state) => state.category.visibleModalCreateOrUpdateCategory
  );
  const isLoadingBtnCreateOrUpdateCategory = useSelector(
    (state) => state.category.isLoadingBtnCreateOrUpdateCategory
  );
  const errorCreateOrUpdateCategory = useSelector(
    (state) => state.category.errorCreateOrUpdateCategory
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateCategory]);

  useEffect(() => {
    dispatch(
      setErrorCreateOrUpdateCategory({
        name: "",
      })
    );
  }, [dataCreateOrUpdate, dispatch]);

  useEffect(() => {
    setDataCreateOrUpdate({
        name: category.name,
    });
  }, [category]);

  const handleReloadData = () => {
    setDataCreateOrUpdate({
        name: "",
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
      errorCreateOrUpdateCategory
    );
    dispatch(setErrorCreateOrUpdateCategory(validate.error));
    return validate.isError;
  };

  const handleConfirmCreateOrUpdateCategory = () => {
    let dataToSend = {
        name: dataCreateOrUpdate.name,
        description: dataCreateOrUpdate.description,
    };

    const validate = handleCheckValidateConfirm(
      dataToSend,
      errorCreateOrUpdateCategory
    );
    dispatch(setErrorCreateOrUpdateCategory(validate.dataError));

    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateCategory(dataToSend)); // Gửi dữ liệu JSON
      } else {
        dispatch(handleUpdateCategory(dataToSend, category.id)); // Gửi dữ liệu JSON
      }
    }
  };

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateCategory}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateCategory(false))}
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
              error={errorCreateOrUpdateCategory.name}
            />
          </div>

        <div className={styles.btnWrap}>
          <ButtonRES
            textBtn={"Create"}
            loading={isLoadingBtnCreateOrUpdateCategory}
            onClick={() => handleConfirmCreateOrUpdateCategory()}
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
