import React, { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import Header from "../../shared-components/Header";
import { Flex, Row, Col, Avatar, Space, List } from "antd";
import { UserOutlined } from "@ant-design/icons";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

export const Profile = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <Header currentUser={currentUser} />
      <Flex className="userProfileContainer" align="center" justify="center">
        <div className="userInfo">
          <div className="userAvt">
            <Space>
              <Avatar icon={<UserOutlined />} />
            </Space>
          </div>
          <Row className="info" align="center" justify="space-between">
            <Col span={6}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                        />
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description=""
                    />
                  </List.Item>
                )}
              />
            </Col>
            <Col span={6}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                        />
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description=""
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
      </Flex>
    </div>
  );
};

export default Profile;
