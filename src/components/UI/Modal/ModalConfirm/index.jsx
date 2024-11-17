import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import PropTypes from "prop-types";
import ButtonRES from '../../Button';

ModalConfirm.prototype = {
  isModalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  textBtnConfirm: PropTypes.string.isRequired,
  textBtnCancel: PropTypes.string.isRequired,
  loadingBtnConfirm: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
}

ModalConfirm.defaultProps = {
  isModalOpen: false,
  title: 'Do you want Delete %record name%?',
  description: 'Are you sure you want to delete %record name%? Your action can not be undone.',
  textBtnConfirm: 'Yes',
  textBtnCancel: 'Cancel',
  loadingBtnConfirm: false,
  type: 'DEFAULT'
}

function ModalConfirm(props) {
  const isDanger = props.textBtnConfirm === 'Delete';
  return (
    <Modal
      type={props.type}
      open={props.isModalOpen}
      footer={false}
      className={`general-dialog-wrap`}
      closable={false}
    >
      <div className={styles.headerDialogWrap}>
        {
          props.type === 'DEFAULT' ?
            <span className={styles.title}>
              <span style={{
                marginRight: 10,
                fontSize: 20,
                color: '#faad14'
              }}>{<ExclamationCircleFilled />}</span>
              {/* Do you want to delete these items? */}
              {props.title}
            </span> : ''
        }
      </div>

      <div className={styles.mainDialog}>
        <div className={styles.descriptionMainDialog}>{props.description}</div>
      </div>

      <div className={styles.btnWrap}>
        {
          props.textBtnConfirm.length > 0 ?
            <ButtonRES
              textBtn={props.textBtnConfirm}
              onClick={() => props.onConfirm()}
              loading={props.loadingBtnConfirm}
              danger={isDanger}
            />
            : ''
        }

        <ButtonRES
          textBtn={props.textBtnCancel}
          onClick={() => props.onClose()}
        />
      </div>
    </Modal>
  );
}

export default ModalConfirm
