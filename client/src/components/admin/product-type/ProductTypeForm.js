import React from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import ModalComponent from "../../shared-components/Modal";

export const ProductTypeForm = ({
  title,
  isShowAddBtn,
  form,
  typeName,
  isOpenModal,
  handleChange,
  handleOpenModal,
  handleCloseModal,
  handleFinish
}) => {

  return (
    <div>
      {isShowAddBtn && (
        <Button
          className="addProductBtn"
          type="primary"
          onClick={handleOpenModal}
        >
          <PlusSquareOutlined />
          Thêm loại sản phẩm
        </Button>
      )}
      <ModalComponent
        title={title}
        className="productTypeModal"
        forceRender={title}
        open={isOpenModal}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form
          className="productTypeForm"
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên loại sản phẩm"
            name="typeName"
            rules={[
              { required: true, message: "Please input your product type name!" },
            ]}
          >
            <Input
              value={typeName}
              onChange={handleChange}
              name="typeName"
            />
          </Form.Item>
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

export default ProductTypeForm;
