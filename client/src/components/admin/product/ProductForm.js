import React from "react";
import { WrapperUploadFile } from "./ProductWrapper";
import { Button, Form, Input, Select, Space } from "antd";
import { PlusOutlined, PlusSquareOutlined } from "@ant-design/icons";
import ModalComponent from "../../shared-components/Modal";
import "./Product.css";

export const ProductForm = (props) => {
  const {
    title,
    isShowAddBtn,
    productForm,
    productName,
    basicPrice,
    discount,
    type,
    countInStock,
    sizeValue,
    price,
    image,
    productTypes,
    handleChange,
    isProductModalOpen,
    handleOpenProductModal,
    handleCloseProductModal,
    handleCreateProduct,
  } = props;

  return (
    <div className="productFormModalContainter">
      {isShowAddBtn && (
        <Button
          className="addProductBtn"
          type="primary"
          onClick={handleOpenProductModal}
        >
          <PlusSquareOutlined />
          Thêm sản phẩm
        </Button>
      )}
      <ModalComponent
        title={title}
        className="productModal"
        forceRender={title}
        open={isProductModalOpen}
        onCancel={handleCloseProductModal}
        footer={null}
      >
        <Form
          className="productForm"
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleCreateProduct}
          autoComplete="off"
          form={productForm}
          encType="multipart/form-data"
        >
          {/* Starting Product name field*/}
          <Form.Item
            label="Tên sản phẩm"
            name="productName"
            rules={[
              { required: true, message: "Please input your product name!" },
            ]}
          >
            <Input
              value={productName}
              onChange={handleChange}
              name="productName"
            />
          </Form.Item>
          {/* Ending Product name field */}

          {/* Starting Basic price field*/}
          <Form.Item
            label="Giá cơ bản"
            name="basicPrice"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <Input
              value={basicPrice}
              onChange={handleChange}
              name="basicPrice"
            />
          </Form.Item>
          {/* Ending Basic price field*/}

          {/* Starting Discount field*/}
          <Form.Item label="Khuyến mãi" name="discount">
            <Input value={discount} onChange={handleChange} name="discount" />
          </Form.Item>
          {/* Ending Discount field*/}

          {/* Starting Type field*/}
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please input your type!" }]}
          >
            <Select
              name="type"
              value={type}
              onChange={handleChange}
              options={productTypes && productTypes.length && productTypes.map((item) => ({
                value: item._id,
                label: item.typeName,
              }))}
            />
          </Form.Item>
          {/* Ending Type field*/}

          {/* Starting Count in stock field*/}
          <Form.Item
            label="Hàng trong kho"
            name="countInStock"
            rules={[
              { required: true, message: "Please input your countInStock!" },
            ]}
          >
            <Input
              value={countInStock}
              onChange={handleChange}
              name="countInStock"
            />
          </Form.Item>
          {/* Ending Count in stock field*/}

          {/* Starting Size field*/}
          <Form.List className="sizeListContainer" name="size">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                  <Space
                    className="sizeItemContainer"
                    key={key}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      label="Size"
                      name={[name, "sizeValue"]}
                      fieldKey={[fieldKey, "sizeValue"]}
                    >
                      <Input
                        value={sizeValue}
                        onChange={handleChange}
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
                        value={price}
                        onChange={handleChange}
                        name="price"
                      />
                    </Form.Item>
                    <Button className="deleteSizeBtn" onClick={() => {}}>
                      <span
                        onClick={() => {
                          remove(name);
                        }}
                      >
                        XÓA
                      </span>
                    </Button>
                  </Space>
                ))}
                <Button
                  className="addSizeBtn"
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  icon={<PlusOutlined />}
                >
                  Add Size
                </Button>
              </>
            )}
          </Form.List>
          {/* Ending Size field*/}

          {/* Starting Image field*/}
          <Form.Item
            className="productFileContainer"
            label="Hình ảnh"
            name="image"
            type="file"
            rules={[
              { required: true, message: "Please input your count image!" },
            ]}
          >
            <WrapperUploadFile onChange={handleChange} maxCount={1}>
              <Button>Select File</Button>
              {image && <img className="productImg" src={image} alt="image" />}
            </WrapperUploadFile>
          </Form.Item>
          {/* Ending Image field*/}

          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};
