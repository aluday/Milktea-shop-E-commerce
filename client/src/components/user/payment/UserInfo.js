import React, { useEffect } from 'react';
import { Form, Input, Flex} from 'antd';
// import mockData from "../../../mockData.json";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const UserInfo = ({ userInfoForm }) => {
  // const userInfo = mockData.currentUser;

  // useEffect(() => {
  //   userInfoForm.setFieldValue("fullName", userInfo.name);
  //   userInfoForm.setFieldValue("email", userInfo.email);
  //   userInfoForm.setFieldValue("phone", userInfo.phone);
  //   userInfoForm.setFieldValue("address", userInfo.address);
  // }, [userInfo]);

  return (
    <div>
      <h3>Thông tin vận chuyển</h3>
      <Form
        {...layout}
        name="userInfoForm"
        validateMessages={validateMessages}
        form={userInfoForm}
        className='userInfoForm'
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
          <Input name="fullName" />
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
          <Input name="phone" />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ">
          <Input name="address" />
        </Form.Item>
      </Form>

      <h3>
        Hình thức thanh toán
      </h3>
      <Flex className='paymentMethod' align="center">
        <p>Thanh toán khi nhận hàng (COD)</p>
      </Flex>
    </div>
  );
};
export default UserInfo;