import React, { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import Header from "../../shared-components/Header";
import { Flex, Avatar, Card, Row, Col, Divider, Space, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const Profile = () => {
  const { getCurrentUserData } = useContext(UserContext);
  const currentUser = getCurrentUserData();

  return (
    <>
      <Header />
      <Flex className="userProfileContainer" align="center" justify="center">
        <div className="userInfoWrapper">
          <Flex vertical align="center" justify="center">
            <Avatar size={72} icon={<UserOutlined />} />
            <h1>{currentUser && currentUser.name}</h1>
            <p className="text-link"> Chỉnh sửa thông tin </p>
          </Flex>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Card
                className="basicInfoCardContainer"
                title="Thông tin cơ bản"
                bordered={false}
              >
                <Flex className="basicInfoContainer" vertical justify="center">
                  <Flex justify="space-between">
                    <Space>
                      <h4>Họ tên</h4>
                    </Space>
                    <Space>
                      <p>{currentUser && currentUser.name}</p>
                    </Space>
                  </Flex>
                  <Flex justify="space-between">
                    <Space>
                      <h4>Ngày sinh</h4>
                    </Space>
                    <Space>
                      <p>{(currentUser && currentUser.dob) || "-"}</p>
                    </Space>
                  </Flex>
                  <Flex justify="space-between">
                    <Space>
                      <h4>Giới tính</h4>
                    </Space>
                    <Space>
                      <p>{(currentUser && currentUser.gender) || "-"}</p>
                    </Space>
                  </Flex>
                </Flex>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                className="contactInfoCardContainer"
                title="Thông tin liên lạc"
                bordered={false}
              >
                <Flex className="basicInfoContainer" vertical justify="center">
                  <Flex justify="space-between">
                    <Space>
                      <h4>Email</h4>
                    </Space>
                    <Space>
                      <p>{(currentUser && currentUser.email) || "-"}</p>
                    </Space>
                  </Flex>
                  <Flex justify="space-between">
                    <Space>
                      <h4>Số điện thoại</h4>
                    </Space>
                    <Space>
                      <p>{(currentUser && currentUser.phone) || "-"}</p>
                    </Space>
                  </Flex>
                  <Flex justify="space-between">
                    <Space>
                      <h4>Địa chỉ</h4>
                    </Space>
                    <Space>
                      <p>{(currentUser && currentUser.address) || "-"}</p>
                    </Space>
                  </Flex>
                </Flex>
              </Card>
            </Col>
          </Row>
        </div>
      </Flex>
    </>
  );
};

export default Profile;
