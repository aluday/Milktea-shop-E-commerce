import React, { useState, useEffect } from "react";
import TableComponent from "../../shared-components/Table";
import {
  DeleteOutlined,
  EditOutlined,
  // SearchOutlined,
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
import Loading from "../../shared-components/Loading";

export const ProductType = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [productTypeForm] = Form.useForm();
  const [productTypeFormDetails] = Form.useForm();
  const [typeName, setTypeName] = useState("");
  const [typeId, setTypeId] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forceRerender, setForceRerender] = useState(1);

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

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

  // const handleSelectRow = (record, index) => {
  //   console.log("record", index);
  // };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    resetData();
  };

  const handleOpenUpdateModal = () => {
    setIsOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setIsOpenUpdateModal(false);
    resetData();
  };

  const handleChange = (e) => {
    setTypeName(e.target.value);
  };

  const handleUpdateProductType = (item) => {
    productTypeFormDetails.setFieldValue("typeName", item.typeName);
    setTypeName(item.typeName);
    setIsOpenUpdateModal(true);
  };

  const handleDeleteProductType = () => {
    setShowConfirmDeleteDialog(false);
    deleteProductType(typeId)
      .then((res) => {
        if (res && res.status) {
          messages.successNotification(
            "Success!",
            "Xóa loại sản phẩm thành công."
          );
        } else {
          messages.errorNotification("Error!", res.message);
        }
        setForceRerender((cur) => cur + 1);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const handleCreateAndUpdateType = (action) => {
    const prepareData = {
      type_name:
        action === "add"
          ? productTypeForm.getFieldValue("typeName")
          : productTypeFormDetails.getFieldValue("typeName"),
    };
    if (action === "add") {
      setIsOpenModal(false);
      createProductType(prepareData)
        .then((res) => {
          if (res.status) {
            messages.successNotification(
              "Success!",
              "Tạo loại sản phẩm thành công."
            );
          } else {
            messages.errorNotification("Error!", res.message);
          }
          setForceRerender((cur) => cur + 1);
        })
        .catch((err) => {
          handleError(err);
          resetData();
          setForceRerender((cur) => cur + 1);
        });
    } else if (action === "update") {
      setIsOpenUpdateModal(false);
      updateProductType(prepareData, typeId)
        .then((res) => {
          if (res && res.status) {
            messages.successNotification(
              "Success!",
              "Cập nhật loại sản phẩm thành công."
            );
          } else {
            messages.errorNotification("Error!", res.message);
          }
          setForceRerender((cur) => cur + 1);
        })
        .catch((err) => {
          handleError(err);
          resetData();
          setForceRerender((cur) => cur + 1);
        });
    }
  };

  const resetData = () => {
    productTypeFormDetails.resetFields();
    productTypeForm.resetFields();
    setTypeName("");
    setTypeId("");
  };

  useEffect(() => {
    getAllProductTypes()
      .then((res) => {
        if (res && res.status && res.data.length > 0) {
          const productTypeData = res.data.map((item, index) => ({
            _id: item._id,
            columnNo: index + 1,
            typeName: item.type_name,
          }));
          setProductTypes(productTypeData);
          setIsLoading(false);
        } else {
          messages.error("Error!", res.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        handleError(err);
        setIsLoading(false);
      });
  }, [forceRerender]);

  return (
    <div>
      <Loading isLoading={isLoading} />
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
        handleFinish={() => {
          handleCreateAndUpdateType("add");
        }}
      />

      <TableComponent
        columns={displayedColumns}
        data={productTypes}
        // onRow={handleSelectRow}
      />

      <ProductTypeForm
        title="Sửa loại sản phẩm"
        form={productTypeFormDetails}
        typeName={typeName}
        isOpenModal={isOpenUpdateModal}
        handleChange={handleChange}
        handleOpenModal={handleOpenUpdateModal}
        handleCloseModal={handleCloseUpdateModal}
        handleFinish={() => {
          handleCreateAndUpdateType("update");
        }}
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
