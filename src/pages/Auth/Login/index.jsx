import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import AuthLayout from '../../../layouts/AuthLayout';
import InputRES from "../../../components/UI/Input";
import _ from 'lodash';
import ButtonRES from "../../../components/UI/Button";
import {useNavigate} from "react-router-dom";
import {isValidate} from "../../../utils/validate";
import {handleCheckValidateConfirm} from "../../../utils/helper";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../api/auth";
import { setErrorLogin } from 'states/modules/auth';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataLogin, setDataLogin] = useState({
    email : '',
    password: ''
  })

  const isLoadingBtnLogin = useSelector(state => state.auth.isLoadingBtnLogin);
  const isAuthSuccess = useSelector(state => state.auth.isAuthSuccess);
  const loginError = useSelector(state => state.auth.loginError);

  useEffect(() => {
    dispatch(setErrorLogin({
      email: '',
      password: ''
    }));
  }, [dataLogin, dispatch])

  useEffect(() => {
    if (isAuthSuccess) {
      navigate('/')
    }
  }, [isAuthSuccess, navigate])

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;
    let data = _.cloneDeep(dataLogin);
    data[type] = value;
    setDataLogin(data);
  }

  const validateBlur = (type) => {
    let validate = isValidate(dataLogin, type, loginError);
    dispatch(setErrorLogin(validate.error));
    return validate.isError;
  }

  const handleConfirmLogin = () => {
    let validate = handleCheckValidateConfirm(dataLogin, loginError);
    setErrorLogin(validate.dataError);
    if (!validate.isError) {
      dispatch(login(dataLogin));
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirmLogin()
    }
  }

  return (
    <AuthLayout title={'Welcome back'}>
      <div className={styles.loginWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Email *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter email..."}
            onChange={(e) => handleChangeInput(e, 'email')}
            onBlur={() => validateBlur('email')}
            value={dataLogin.email}
            error={loginError.email}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Password *</div>
          <InputRES
            type={'password'}
            placeholder={'******'}
            value={dataLogin.password}
            onChange={(e) => handleChangeInput(e, 'password')}
            onBlur={() => validateBlur('password')}
            onKeyDown={(e) => handleKeyDown(e)}
            error={loginError.password}
          />
        </div>

        <div className={styles.btnUtilitiesWrap}>
          <div
            onClick={() => navigate('/forgot-password')}
            className={styles.btnForgetPassword}
          >
            Forgot password
          </div>
        </div>

        <div className={styles.btnWrap}>
          <ButtonRES
            textBtn={'Login'}
            loading={isLoadingBtnLogin}
            onClick={() => handleConfirmLogin()}
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

export default Login;
