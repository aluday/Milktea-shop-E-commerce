import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Flex, Input, Button } from "antd";
import "./Account.css";
import { UserContext } from "../../../providers/UserProvider";
import Header from "../../shared-components/Header";
import {
  signin,
  getCurrentUser,
  handleError,
} from "../../../services/endpoint-services";
import * as messages from "../../../services/messages";

export const SigninPage = () => {
  const navigate = useNavigate();
  const { username, setUsername, password, setPassword, setCurrentUser } =
    useContext(UserContext);

  const handleSignin = () => {
    signin({ username, password })
      .then((res) => {
        if (res && res.status && res.data && res.data.access_token) {
          localStorage.setItem("access_token", res.data.access_token);
          // call authorize to verify the token again to get the current user who logged in
          getCurrentUser(res.data.access_token)
            .then((res) => {
              if (res && res.data && res.data.currentUser) {
                setCurrentUser(res.data.currentUser);
                navigate("/");
                localStorage.setItem(
                  "current_user",
                  JSON.stringify(res.data.currentUser)
                );
                window.location.reload();
              } else {
                messages.errorNotification("Error!", res.message);
                handleNavigate();
              }
            })
            .catch((err) => {
              handleError(err);
              handleNavigate();
            });
        } else {
          messages.errorNotification("Error!", res.message);
          handleNavigate();
        }
      })
      .catch((err) => {
        handleError(err);
        handleNavigate();
      });
  };

  const handleNavigate = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Header />
      <Flex className="accountContainer" align="center" justify="center">
        <div className="signinForm">
          <h2 className="signinText">ĐĂNG NHẬP</h2>
          <Flex vertical justify="center" gap={16}>
            <Input
              className="usernameField"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Input.Password
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              iconRender={(visible) =>
                visible ? <EyeFilled /> : <EyeInvisibleFilled />
              }
            />
            <Button
              type="primary"
              className="signinBtn"
              disabled={!username || !password}
              onClick={handleSignin}
            >
              ĐĂNG NHẬP
            </Button>
          </Flex>
          <Flex justify="space-between">
            <p
              onClick={() => {
                navigate("/sign-up");
              }}
              className="text-link"
            >
              Tạo tài khoản?
            </p>
          </Flex>
        </div>
      </Flex>
    </>
  );
};

export default SigninPage;
