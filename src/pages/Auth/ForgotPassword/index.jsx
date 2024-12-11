import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import AuthLayout from '../../../layouts/AuthLayout'
import InputRES from "../../../components/UI/Input";
import _ from 'lodash';
import ButtonRES from "../../../components/UI/Button";
import {isValidate} from "../../../utils/validate";
import {handleCheckValidateConfirm} from "../../../utils/helper";
import {forgotPassword} from "../../../api/auth";
import {useDispatch, useSelector} from "react-redux";
import { setErrorDataForgotPassword } from 'states/modules/auth';

function ForgotPassword() {
  const [dataForgotPassword, setDataForgotPassword] = useState({ email: '' })
 const isLoadingBtnForgotPassword = useSelector((state) => state.auth.isLoadingBtnForgotPassword);
 const forgotPasswordError = useSelector((state) => state.auth.forgotPasswordError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setErrorDataForgotPassword({
      email: ''
    }));
  }, [dataForgotPassword, dispatch]);

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataForgotPassword);
    data[type] = value;
    setDataForgotPassword(data);
  }

  const validateBlur = (type) => {
    let validate = isValidate(dataForgotPassword, type, forgotPasswordError);
    setErrorDataForgotPassword(validate.error);
    return validate.isError;
  }

  const handleConfirmEmail = () => {
    let validate = handleCheckValidateConfirm(dataForgotPassword, forgotPasswordError);
    setErrorDataForgotPassword(validate.dataError);
    if (!validate.isError) {
     dispatch(forgotPassword(dataForgotPassword));
    }
  }

  return (
    <AuthLayout title={'Forgot password'}>
      <div className={styles.forgotPasswordWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Email *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter email..."}
            onChange={(e) => handleChangeInput(e, 'email')}
            onBlur={() => validateBlur('email')}
            value={dataForgotPassword.email}
            error={forgotPasswordError.email}
          />
        </div>

        <div className={styles.btnWrap}>
          <ButtonRES
            textBtn={'Send email'}
            loading={isLoadingBtnForgotPassword}
            onClick={() => handleConfirmEmail()}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        </div>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
