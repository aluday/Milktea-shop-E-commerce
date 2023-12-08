import React from "react";
import { Form, Input, Flex } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} là bắt buộc!",
};

const UserInfo = ({
  userInfoForm,
  fullName,
  phone,
  address,
  isDisabledFullName,
  handleChange,
}) => {
  return (
    <div>
      <h3>Thông tin vận chuyển</h3>
      <Form
        {...layout}
        name="userInfoForm"
        validateMessages={validateMessages}
        form={userInfoForm}
        className="userInfoForm"
      >
        <Form.Item
          name="fullName"
          label="Tên"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            name="fullName"
            value={fullName}
            onChange={handleChange}
            disabled={isDisabledFullName}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="phone" value={phone} onChange={handleChange} />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input name="address" value={address} onChange={handleChange} />
        </Form.Item>
      </Form>

      <h3>Hình thức thanh toán</h3>
      <Flex className="paymentMethod" align="center">
        <p>Thanh toán khi nhận hàng (COD)</p>
      </Flex>
    </div>
  );
};
export default UserInfo;
