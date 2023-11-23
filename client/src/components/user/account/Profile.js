import React, { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import Header from "../../shared-components/Header";
import { Flex, Avatar, Card, Row, Col, Divider, Space, Empty } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

export const Profile = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <Header currentUser={currentUser} />
      <Flex className="userProfileContainer" align="center" justify="center">
        <div className="userInfoWrapper">
          <Flex vertical align="center" justify="center">
            <Avatar size={72} icon={<UserOutlined />} />
            <h1>Anh Luu</h1>
            <p className="text-link"> Chỉnh sửa thông tin </p>
          </Flex>
          <Divider />
          <Row gutter={16}>
            <Col span={8}>
              <Card className="basicInfoCardContainer" title="Thông tin cơ bản" bordered={false}>
                <Flex className="basicInfoContainer" vertical justify="center">
                  <Flex justify="space-between">
                    <Space><h4>Họ tên:</h4></Space>
                    <Space><p>Anh Luu</p></Space>
                  </Flex>
                  <Flex justify="space-between">
                    <Space><h4>Số điện thoại:</h4></Space>
                    <Space><p>0123456789</p></Space>
                  </Flex>
                  <Flex justify="space-between">
                    <Space><h4>Email:</h4></Space>
                    <Space><p>abc@gmail.com</p></Space>
                  </Flex>
                  <Flex justify="space-between">
                    <Space><h4>Địa chỉ:</h4></Space>
                    <Space><p>abc@gmail.com</p></Space>
                  </Flex>
                </Flex>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Thông tin bổ sung" bordered={false}>
                <Empty />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Thiết lập hệ thống" bordered={false}>
                <Empty />
              </Card>
            </Col>
          </Row>
        </div>
      </Flex>
    </>
  );
};

export default Profile;
