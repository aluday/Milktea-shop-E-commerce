import React, { useState, useEffect } from "react";
import TableComponent from "../../shared-components/Table";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Form } from "antd";
import mockData from "../../../mockData.json";
import ProductTypeForm from "./ProductTypeForm";
import {
  createProductType,
  getAllProductTypes,
  handleError,
} from "../../../services/endpoint-services";

export const ProductType = () => {
  const [productTypeForm] = Form.useForm();
  const [typeName, setTypeName] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  // const [productTypes, setProductTypes] = useState([]);

  const renderActions = (_, record) => {
    return (
      <div className="tableActions">
        <EditOutlined
          className="edit"
          onClick={() => {
            // handleUpdateProduct(record._id);
            // setProductId(record._id);
          }}
        />
        <DeleteOutlined
          className="delete"
          onClick={() => {
            // setShowConfirmDeleteDialog(true);
            // setProductId(record._id);
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

  const productTypes = mockData.types.map((item, index) => ({
    columnNo: index + 1,
    typeName: item.type_name,
  }));

  const handleSelectRow = (record, index) => {
    // console.log("record", index);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleChange = () => {};

  const handleCreateAndUpdateType = () => {};

  useEffect(() => {
    getAllProductTypes()
      .then((res) => {
        console.log("res:", res);
      })
      .catch((err) => {
        handleError(err);
      });
  }, []);

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
        handleFinish={handleCreateAndUpdateType}
      />

      <TableComponent
        columns={displayedColumns}
        data={productTypes}
        onRow={handleSelectRow}
      />
    </div>
  );
};

export default ProductType;
