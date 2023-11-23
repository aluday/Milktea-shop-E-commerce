import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Flex, Input, Button } from "antd";
import * as messages from "../../../services/messages";
import { signup, handleError } from "../../../services/endpoint-services";
import "./Account.css";

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const hanleRegisterAccount = () => {
    const preparedUserData = {
      name,
      email,
      phone,
      username,
      password,
      confirmPassword,
    };
    signup(preparedUserData)
      .then((res) => {
        if (res.status === 200) {
          messages.success();
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        handleError(err);
        messages.error();
      });
  };

  return (
    <Flex className="accountContainer" align="center" justify="center">
      <div className="signupForm">
        <h2 className="signupText">ĐĂNG KÝ</h2>
        <Flex vertical justify="center" gap={16}>
          <Input
            className="nameField"
            placeholder="Tên"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            className="emailField"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            className="phoneNoField"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <Input
            className="usernameField"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input.Password
            className="passwordField"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            iconRender={(visible) => (visible ? <EyeFilled /> : <EyeInvisibleFilled />)}
          />
          <Input.Password
            className="confirmPasswordField"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            iconRender={(visible) => (visible ? <EyeFilled /> : <EyeInvisibleFilled />)}
          />
          <Button
            type="primary"
            className="signupBtn"
            disabled={
              !name.length ||
              !email.length ||
              !phone.length ||
              !username.length ||
              !password.length ||
              !confirmPassword.length
            }
            onClick={hanleRegisterAccount}
          >
            ĐĂNG KÝ
          </Button>
        </Flex>
        <Flex justify="space-between">
          <p onClick={() => { navigate("/sign-in") }} className="text-link">Đăng nhập</p>
        </Flex>
      </div>
    </Flex>
  );
};

export default SignupPage;
