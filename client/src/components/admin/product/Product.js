import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./ProductWrapper";
import { Button, Form, Input, Select, Space } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TableComponent from "../../shared-components/Table";
import InputComponent from "../../shared-components/Input";
import ModalComponent from "../../shared-components/Modal";
import DrawerComponent from "../../shared-components/Drawer";
import { AddProduct } from "./AddProduct";
import { ProductList } from "./ProductList";
import * as messages from "../../../services/messages";
import { PRODUCT_TYPES } from "../../../services/constants";
import "./Product.css";
import { createProduct } from '../../../services/endpoint-services';

export const Product = () => {
  /* Starting variables for AddProduct component */
  const [productForm] = Form.useForm();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [basicPrice, setBasicPrice] = useState(0);
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [sizeValue, setSizeValue] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  /* Ending variables for AddProduct component */

  /* Starting variables for ProductList component */
  const [productList, setProductList] = useState([]);
  const [rowSelected, setRowSelected] = useState("");
  /* Ending variables for ProductList component */

  /* Starting variables for ProductDetails component */
  const [isOpenProductDetailsDrawer, setIsOpenProductDetailsDrawer] =
    useState(false);
  const [productDetailsForm] = Form.useForm();
  /* Ending variables for ProductDetails component */

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const renderActions = () => {
    return (
      <div className="productActions">
        <EditOutlined className="edit" onClick={() => {}} />
        <DeleteOutlined
          className="delete"
          onClick={() => setIsModalOpenDelete(true)}
        />
      </div>
    );
  };

  const displayedColumns = [
    {
      title: "Name",
      dataIndex: "productName",
      // ...getColumnSearchProps('productName')
    },
    {
      title: "Price",
      dataIndex: "basicPrice",
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
    },
    {
      title: "Count In Stock",
      dataIndex: "countInStock",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderActions,
    },
  ];

  const handleCreateProduct = async () => {
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('basicPrice', basicPrice);
    formData.append('discount', discount);
    formData.append('type', type);
    formData.append('countInStock', countInStock);
    formData.append('size', productForm.getFieldValue("size"));
    formData.append('image', image);
    await createProduct(formData);
  };

  const handleCreateProductFormChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      if (name === "productName") {
        setProductName(value);
      } else if (name === "basicPrice") {
        setBasicPrice(value);
      } else if (name === "discount") {
        setDiscount(value);
      } else if (name === "countInStock") {
        setCountInStock(value);
      }
    } else if (typeof e === "object") {
      setImage(e.file.originFileObj);
    } else {
      setType(e);
    }
  };

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>

      {/* Starting Add Product modal */}
      <AddProduct
        productForm={productForm}
        productName={productName}
        basicPrice={basicPrice}
        discount={discount}
        type={type}
        countInStock={countInStock}
        sizeValue={sizeValue}
        price={price}
        image={image}
        isProductModalOpen={isProductModalOpen}
        handleChange={handleCreateProductFormChange}
        handleOpenProductModal={() => {
          setIsProductModalOpen(true);
        }}
        handleCloseProductModal={() => {
          setIsProductModalOpen(false);
        }}
        handleCreateProduct={handleCreateProduct}
      />
      {/* Ending Add Product modal */}

      {/* Starting Product list */}
      <ProductList
        columns={displayedColumns}
        dataTable={productList}
        setRowSelected={setRowSelected}
      />
      {/* Ending Product list */}

      {/* Starting Update Product modal */}
      {/* <div className="productDetailsContainer">
        <DrawerComponent
          forceRender
          title="Chi tiết sản phẩm"
          isOpen={isOpenProductDetailsDrawer}
          onClose={() => setIsOpenProductDetailsDrawer(false)}
          width="38%"
        >
          <Form
            name="basic"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={() => {}}
            autoComplete="off"
            form={productDetailsForm}
            encType="multipart/form-data"
          >
            <Form.Item label="Tên sản phẩm" name="productname">
              <Input
                value={stateProductDetails.productname}
                onChange={(e) => handleDetailsProduct(e, "productname")}
                name="productname"
              />
            </Form.Item>
            <Form.Item label="Giá cơ bản" name="basicPrice">
              <Input
                value={stateProductDetails.basicPrice}
                onChange={(e) => handleOnChangeDetails(e, "basicPrice")}
                name="basicPrice"
              />
            </Form.Item>

            <Form.Item label="Khuyến mãi" name="discount">
              <Input
                value={stateProductDetails.discount}
                onChange={(e) => handleOnChangeDetails(e, "discount")}
                name="discount"
              />
            </Form.Item>

            <Form.Item label="Type" name="type">
              <Select
                name="type"
                value={stateProductDetails.type}
                onChange={handleChangeSelectDetails}
                options={arrType.map((type) => ({ value: type, label: type }))}
              />
            </Form.Item>
            <Form.Item label="Hàng trong kho" name="countInStock">
              <Input
                value={stateProductDetails.countInStock}
                onChange={(e) => handleOnChangeDetails(e, "countInStock")}
                name="countInStock"
              />
            </Form.Item>

            <Form.List name="size">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(
                    ({ key, name, fieldKey, ...restField }, index) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          label="Size"
                          name={[name, "sizeValue"]}
                          fieldKey={[fieldKey, "sizeValue"]}
                        >
                          <Input
                            value={
                              stateProductDetails.size[index]
                                ? stateProductDetails.size[index].sizeValue
                                : ""
                            }
                            onChange={(e) => handleOnChangeDetails(e, index)}
                            name="sizeValue"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="Giá"
                          name={[name, "price"]}
                          fieldKey={[fieldKey, "price"]}
                        >
                          <Input
                            value={
                              stateProductDetails.size[index]
                                ? stateProductDetails.size[index].price
                                : ""
                            }
                            onChange={(e) => handleOnChangeDetails(e, index)}
                            name="price"
                          />
                        </Form.Item>

                        <Button
                          onClick={() => handleRemoveSize(index)}
                          style={{ background: "red" }}
                        >
                          <span
                            onClick={() => {
                              remove(name);
                            }}
                            style={{ width: "25px", color: "white" }}
                          >
                            {" "}
                            XÓA{" "}
                          </span>
                        </Button>
                      </Space>
                    )
                  )}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Size
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item label="Hình ảnh" name="image" type="file">
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
              >
                <Button>Select File</Button>
                {stateProduct?.image && (
                  <img
                    src={stateProductDetails?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avt"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </DrawerComponent>
      </div> */}
      {/* Ending Update Product modal */}
    </div>
  );
};

export default Product;
