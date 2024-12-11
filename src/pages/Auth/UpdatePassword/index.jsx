import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import AuthLayout from '../../../layouts/AuthLayout';
import InputRES from "../../../components/UI/Input";
import _ from 'lodash';
import ButtonRES from "../../../components/UI/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { isValidate } from "../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../api/auth";


function UpdatePassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [dataUpdate, setDataUpdate] = useState({
        passwordNew: '',
        token: '',
    })
    const [errorDataUpdate, setErrorDataUpdate] = useState({
        passwordNew: '',
    })
    const isLoadingBtnUpdate = useSelector(state => state.auth.isLoadingBtnUpdate);

    
    useEffect(() => {
        const pathSegments = location.pathname.split('/'); // Tách đường dẫn theo dấu '/'
        const token = pathSegments[pathSegments.length - 1]; // Lấy đoạn cuối cùng
        setDataUpdate(prevData => ({ ...prevData, token }));
      }, [location]);
      

    useEffect(() => {
        handleResetError();
    }, [dataUpdate])

    const handleResetError = () => {
        setErrorDataUpdate({
            passwordNew: '',
        });
    }

    const handleChangeInput = (valueInput, type) => {
        let value = valueInput.target.value;
        let data = _.cloneDeep(dataUpdate);
        data[type] = value;
        setDataUpdate(data);  
    }

    const validateBlur = (type) => {
        let validate = isValidate(dataUpdate, type, errorDataUpdate);
        setErrorDataUpdate(validate.error);
        return validate.isError;
    }

    const handleConfirmUpdate = () => {
        let validate = handleCheckValidateConfirm(dataUpdate, errorDataUpdate);
        setErrorDataUpdate(validate.dataError);
        if (!validate.isError) {
            dispatch(updatePassword(dataUpdate));
            navigate('/login')
        }
    }

    return (
        <AuthLayout title={'Welcome back'}>
            <div className={styles.loginWrap}>
                <div className={styles.inputWrapper}>
                    <div className={styles.label}>Password *</div>
                    <InputRES
                        type={"password"}
                        placeholder={'******'}
                        onChange={(e) => handleChangeInput(e, 'passwordNew')}
                        onBlur={() => validateBlur('passwordNew')}
                        value={dataUpdate.passwordNew}
                        error={errorDataUpdate.passwordNew}
                    />
                </div>
                <div className={styles.btnWrap}>
                    <ButtonRES
                        textBtn={'Update'}
                        loading={isLoadingBtnUpdate}
                        onClick={() => handleConfirmUpdate()}
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

export default UpdatePassword;
