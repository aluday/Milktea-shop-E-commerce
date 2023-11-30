import React, { useState, useEffect } from "react";
import TableComponent from "../../shared-components/Table";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Form } from "antd";
import ProductTypeForm from "./ProductTypeForm";
import {
  createProductType,
  getAllProductTypes,
  updateProductType,
  deleteProductType,
  handleError,
} from "../../../services/endpoint-services";
import * as messages from "../../../services/messages";
import ModalComponent from "../../shared-components/Modal";

export const ProductType = ({ productTypes }) => {
  const [productTypeForm] = Form.useForm();
  const [typeName, setTypeName] = useState("");
  const [typeId, setTypeId] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  const renderActions = (_, record) => {
    return (
      <div className="tableActions">
        <EditOutlined
          className="edit"
          onClick={() => {
            handleUpdateProductType(record);
            setTypeId(record._id);
          }}
        />
        <DeleteOutlined
          className="delete"
          onClick={() => {
            setShowConfirmDeleteDialog(true);
            setTypeId(record._id);
          }}
        />
      </div>
    );
  };

  const displayedColumns = [
    {
      title: "#",
      dataIndex: "columnNo",
    },
    {
      title: "Tên loại",
      dataIndex: "typeName",
    },
    {
      title: "Chỉnh sửa",
      dataIndex: "action",
      render: renderActions,
    },
  ];

  const handleSelectRow = (record, index) => {
    // console.log("record", index);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    resetData();
  };

  const handleChange = (e) => {
    setTypeName(e.target.value);
  };

  const handleUpdateProductType = (item) => {
    productTypeForm.setFieldValue("typeName", item.typeName);
    setIsOpenModal(true);
  }

  const handleDeleteProductType = () => {
    deleteProductType(typeId)
      .then(() => {})
      .catch((err) => {
        messages.error("Rất tiếc, đã xảy ra lỗi! :(", "Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ.");
        handleError(err);
      })
  }

  const handleCreateAndUpdateType = (action) => {
    const prepareData = {
      type_name: productTypeForm.getFieldValue("typeName")
    }
    if (action === 'add') {
      createProductType(prepareData)
        .then((res) => {
        })
        .catch((err) => {
          messages.error("Rất tiếc, đã xảy ra lỗi! :(", "Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ.");
          handleError(err);
          resetData();
        });
    } else if (action === 'update') {
      updateProductType(typeId, prepareData)
        .then((res) => {
        })
        .catch((err) => {
          messages.error("Rất tiếc, đã xảy ra lỗi! :(", "Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ.");
          handleError(err);
          resetData();
        });
    }
  };

  const resetData = () => {
    productTypeForm.resetFields();
    setTypeName("");
    setTypeId("");
  }

  // useEffect(() => {
  //   getAllProductTypes()
  //     .then((res) => {
  //       console.log("res:", res);
  //     })
  //     .catch((err) => {
  //       handleError(err);
  //     });
  // }, []);

  return (
    <div>
      <h2>Quản lý loại sản phẩm</h2>
      <ProductTypeForm
        title="Thêm loại sản phẩm"
        isShowAddBtn
        form={productTypeForm}
        typeName={typeName}
        isOpenModal={isOpenModal}
        handleChange={handleChange}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        handleFinish={() => { handleCreateAndUpdateType('add'); }}
      />

      <TableComponent
        columns={displayedColumns}
        data={productTypes}
        onRow={handleSelectRow}
      />

      <ProductTypeForm
        title="Sửa loại sản phẩm"
        form={productTypeForm}
        typeName={typeName}
        isOpenModal={isOpenModal}
        handleChange={handleChange}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        handleFinish={() => { handleCreateAndUpdateType('update'); }}
      />

      <ModalComponent
        title="Xóa loại sản phẩm"
        open={showConfirmDeleteDialog}
        onCancel={() => {
          setShowConfirmDeleteDialog(false);
        }}
        onOk={handleDeleteProductType}
      >
        <div>Bạn có chắc xóa loại sản phẩm này không?</div>
      </ModalComponent>
    </div>
  );
};

export default ProductType;
