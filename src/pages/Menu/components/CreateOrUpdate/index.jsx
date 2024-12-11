import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputRES from "../../../../components/UI/Input";
import ButtonRES from "../../../../components/UI/Button";
import _ from "lodash";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral";
import ReusableSelect from "../../../../components/UI/Select";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorCreateOrUpdateMenu,
  setVisibleModalCreateOrUpdateMenu,
} from "../../../../states/modules/menu";
import { handleCreateMenu, handleUpdateMenu } from "../../../../api/menu";
import { getListUnit } from "api/unit";
import { getListCategory } from "api/category";

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
  let { menu, configModal } = props;
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    unit_id: "",
    category_id: "",
  });
  const visibleModalCreateOrUpdateMenu = useSelector(
    (state) => state.menu.visibleModalCreateOrUpdateMenu
  );
  const isLoadingBtnCreateOrUpdateMenu = useSelector(
    (state) => state.menu.isLoadingBtnCreateOrUpdateMenu
  );
  const errorCreateOrUpdateMenu = useSelector(
    (state) => state.menu.errorCreateOrUpdateMenu
  );
  const units = useSelector((state) => state.unit.units);
  const categories = useSelector((state) => state.category.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateMenu]);

  useEffect(() => {
    dispatch(setErrorCreateOrUpdateMenu({
      name: "",
      price: "",
      description: "",
      unit_id: "",
      category_id: "",
      image_url: "",
    }));
  }, [dataCreateOrUpdate, dispatch]);

  useEffect(() => {
    // Nếu tìm thấy đơn vị và danh mục thì lấy ra đơn vị và danh mục tương ứng với menu
    if (units.length > 0 && categories.length > 0) {
      const matchedUnit = units.find((unit) => unit.name === menu.unit) || {};
      const matchedCategory = categories.find((category) => category.name === menu.category) || {};
  
      setDataCreateOrUpdate({
        name: menu.name || "",
        price: menu.price || "",
        description: menu.description || "", 
        unit_id: matchedUnit.id || "", // Lấy id của đơn vị
        category_id: matchedCategory.id || "", // Lấy id của danh mục
        image_url: "",
      });
    }
  }, [menu, units, categories]);
  

  useEffect(() => {
    dispatch(getListUnit());
    dispatch(getListCategory());
  }, [dispatch]);

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      name: "",
      price: "",
      description: "",
      image_url: "",
      unit_id: "",
      category_id: "",
    });
  };

  const handleChangeInput = (valueInput, type) => {
    let value;

    if (type === "image_url") {
      value = valueInput.target.files[0]; // Lấy tệp từ sự kiện
    } else if (type === "unit_id" || type === "category_id") {
      value = valueInput ? valueInput : dataCreateOrUpdate.unit_id || dataCreateOrUpdate.category_id;
    } else {
      value = valueInput.target.value;
    }
    
    let data = _.cloneDeep(dataCreateOrUpdate); // Clone để không thay đổi trực tiếp dữ liệu cũ
    data[type] = value; // Cập nhật giá trị

    setDataCreateOrUpdate(data); // Cập nhật state mới
    console.log(data);
    
  };

  const validateBlur = (type) => {
    let validate = isValidate(
      dataCreateOrUpdate,
      type,
      errorCreateOrUpdateMenu
    );
    dispatch(setErrorCreateOrUpdateMenu(validate.error));
    return validate.isError;
  };

  const handleConfirmCreateOrUpdateMenu = () => {
    // Tạo FormData để gửi dữ liệu
    const formData = new FormData();
  
    // Thêm các trường khác vào FormData
    formData.append("name", dataCreateOrUpdate.name);
    formData.append("price", dataCreateOrUpdate.price);
    formData.append("description", dataCreateOrUpdate.description);
    
    // Nếu có tệp, thêm vào formData
    if (dataCreateOrUpdate.image_url) {
      formData.append("image_url", dataCreateOrUpdate.image_url); // Giả sử bạn lưu tệp vào dataCreateOrUpdate.image_url
    }
  
    // Thêm các trường khác
    formData.append("unit_id", dataCreateOrUpdate.unit_id);
    formData.append("category_id", dataCreateOrUpdate.category_id);
  
    // Kiểm tra validate
    const validate = handleCheckValidateConfirm(formData, errorCreateOrUpdateMenu);
    dispatch(setErrorCreateOrUpdateMenu(validate.dataError));
  
    if (!validate.isError) {
      // Nếu không có lỗi, gọi API
      if (configModal.type === "CREATE") {
        dispatch(handleCreateMenu(formData)); // Gửi FormData khi tạo mới
        console.log(formData);
        
      } else {
        dispatch(handleUpdateMenu(formData, menu.id)); // Gửi FormData khi cập nhật
      }
    }
  };
  // Nếu không có dữ liệu thì nó sẽ là mảng rỗng
  const unitOptions =
    units?.map((unit) => ({
      value: unit.id,
      label: unit.name,
    })) || [];

  const categoryOptions =
    categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) || [];
    
  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateMenu}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateMenu(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Name *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter name..."}
            onChange={(e) => handleChangeInput(e, "name")}
            onBlur={() => validateBlur("name")}
            value={dataCreateOrUpdate.name}
            error={errorCreateOrUpdateMenu.name}
          />
        </div>

        <div className={styles.inputWrapper}>
          <div className={styles.label}>Price *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter price..."}
            onChange={(e) => handleChangeInput(e, "price")}
            onBlur={() => validateBlur("price")}
            value={dataCreateOrUpdate.price}
            error={errorCreateOrUpdateMenu.price}
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
            error={errorCreateOrUpdateMenu.description}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Image *</div>
          <input
            type="file"
            onChange={(e) => handleChangeInput(e, "image_url")} // Gọi hàm handleChangeInput để xử lý tệp
            accept="image/*" // Chỉ cho phép chọn các loại hình ảnh
            // onBlur={() => validateBlur("image_url")}
            // value={dataCreateOrUpdate.image_url}
            error={errorCreateOrUpdateMenu.image_url}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Unit *</div>
          <ReusableSelect
            onChange={(e) => handleChangeInput(e, "unit_id")}
            options={unitOptions}
            value={dataCreateOrUpdate.unit_id}
            onBlur={() => validateBlur("unit_id")}
            error={errorCreateOrUpdateMenu.unit_id}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Category *</div>
          <ReusableSelect
            onChange={(e) => handleChangeInput(e, "category_id")}
            value={dataCreateOrUpdate.category_id}
            options={categoryOptions}
            onBlur={() => validateBlur("category_id")}
            error={errorCreateOrUpdateMenu.category_id}
          />
        </div>

        <div className={styles.btnWrap}>
          <ButtonRES
            textBtn={"Save"}
            loading={isLoadingBtnCreateOrUpdateMenu}
            onClick={() => handleConfirmCreateOrUpdateMenu()}
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
