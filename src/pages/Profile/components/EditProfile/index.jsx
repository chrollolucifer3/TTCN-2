import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputRES from "../../../../components/UI/Input";
import ButtonRES from "../../../../components/UI/Button";
import { Col, Row } from "antd";
import _ from "lodash";
import { isValidate } from "../../../../utils/validate";
import { useDispatch, useSelector } from "react-redux";
// import {setErrorChangePassword, setErrorInfoUser} from "../../../../states/modules/profile";
import { setErrorChangePassword } from "../../../../states/modules/profile";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
// import {handleChangePassword, handleUpdateInfoUser} from "../../../../api/profile";
import { handleChangePassword } from "../../../../api/profile";

function EditProfile() {
  // const [dataInfoUser, setDataInfoUser] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   position: '',
  // })
  // const errorInfoUser = useSelector(state => state.profile.errorInfoUser);
  // const loadingBtnUpdateInfoUser = useSelector(state => state.profile.loadingBtnUpdateInfoUser);
  const authUser = useSelector((state) => state.auth.authUser);

  const [dataChangePassword, setDataChangePassword] = useState({
    passwordOld: "",
    passwordNew: "",
  });
  const errorChangePassword = useSelector(
    (state) => state.profile.errorChangePassword
  );
  const loadingBtnChangePassword = useSelector(
    (state) => state.profile.loadingBtnChangePassword
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setDataChangePassword({
      passwordNew: "",
      passwordOld: "",
    });
  }, [authUser]);

  const handleChangeInput = (valueInput, type ) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataChangePassword);
    data[type] = value;
    setDataChangePassword(data);
  };

  const validateBlur = (type ) => {
    let data = dataChangePassword;
    let error = errorChangePassword;
    let validate = isValidate(data, type, error);
    dispatch(setErrorChangePassword(validate.error));
    return validate.isError;
  };

  const handleConfirmChangePassword = () => {
    let dataValidate = dataChangePassword;
    let data = new FormData();
    data.append(`passwordOld`, dataChangePassword.currentPassword);
    data.append(`passwordNew`, dataChangePassword.password);

    let validate = handleCheckValidateConfirm(
      dataValidate,
      errorChangePassword
    );
    dispatch(setErrorChangePassword(validate.dataError));
    if (!validate.isError) {
      dispatch(handleChangePassword(dataChangePassword));
    }
  };

  return (
    <div className={styles.editProfile}>
      <Row gutter={20}>
        <Col span={12}>
          <div className={`${styles.personalInformation}`}>
            <div className={styles.headerWrap}>
              <div className={styles.label}>Personal Information</div>
            </div>
            <div className={styles.mainWrap}>
              <div className={styles.inputWrapper}>
                <div className={styles.label}>Name *</div>
                <InputRES
                  type={"text"}
                  value={authUser.full_name}
                  disabled={true}
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.label}>Email *</div>
                <InputRES
                  type={"text"}
                  value={authUser.email}
                  disabled={true}
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.label}>Phone *</div>
                <InputRES
                  type={"text"}
                  value={authUser.phone_number}
                  disabled={true}
                />
              </div>
              <div className={styles.inputWrapper}>
                <div className={styles.label}>Address *</div>
                <InputRES
                  type={"text"}
                  value={authUser.address}
                  disabled={true}
                />
              </div>
              <div className={styles.inputWrapper}>
                <div className={styles.label}>Position *</div>
                <InputRES
                  type={"text"}
                  value={authUser.position}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </Col>

        <Col span={12}>
          <div className={`${styles.personalInformation}`}>
            <div className={styles.headerWrap}>
              <div className={styles.label}>Change Password</div>
            </div>
            <div className={styles.mainWrap}>
              <div className={styles.inputWrapper}>
                <div className={styles.label}>Current password *</div>
                <InputRES
                  type={"password"}
                  placeholder={"Enter current password..."}
                  onChange={(e) =>
                    handleChangeInput(
                      e,
                      "passwordOld",
                      "FORM_CHANGE_PASSWORD"
                    )
                  }
                  onBlur={() =>
                    validateBlur("passwordOld", "FORM_CHANGE_PASSWORD")
                  }
                  value={dataChangePassword.passwordOld}
                  error={errorChangePassword.passwordOld}
                />
              </div>

              <div className={styles.inputWrapper}>
                <div className={styles.label}>New password *</div>
                <InputRES
                  type={"password"}
                  placeholder={"Enter new password..."}
                  onChange={(e) =>
                    handleChangeInput(e, "passwordNew", "FORM_CHANGE_PASSWORD")
                  }
                  onBlur={() =>
                    validateBlur("passwordNew", "FORM_CHANGE_PASSWORD")
                  }
                  value={dataChangePassword.passwordNew}
                  error={errorChangePassword.passwordNew}
                />
              </div>
            </div>

            <div className={styles.btnWrap}>
              <ButtonRES
                onClick={() => handleConfirmChangePassword()}
                loading={loadingBtnChangePassword}
                style={{
                  minWidth: "80px",
                  margin: "0",
                  border: "none",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textBtn={"Save"}
              ></ButtonRES>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default EditProfile;
