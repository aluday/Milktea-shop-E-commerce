import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WrapperTextLight } from "./AccountWrapper";
import ButtonComponent from "../../shared-components/Button";
import InputForm from "../../shared-components/InputForm";
import logo from "../../../assets/logo.png";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import * as messages from "../../../services/messages";
import { signup, handleError } from "../../../services/endpoint-services";
import "./Account.css";

export const SignupPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
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
    <div className="accountContainer">
      <div className="signupForm">
        <img alt="logo" width="130px" height="40px" src={logo} />
        <p className="signupText">ĐĂNG KÝ</p>

        <InputForm
          className="nameField"
          placeholder="Tên"
          value={name}
          onChange={(value) => {
            setName(value);
          }}
        />
        <InputForm
          className="emailField"
          placeholder="Email"
          value={email}
          onChange={(value) => {
            setEmail(value);
          }}
        />
        <InputForm
          className="phoneNoField"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(value) => {
            setPhone(value);
          }}
        />
        <InputForm
          className="usernameField"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(value) => {
            setUsername(value);
          }}
        />
        <div className="passwordFieldWrapper">
          <span onClick={() => setIsShowPassword(!isShowPassword)}>
            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </span>
          <InputForm
            className="passwordField"
            placeholder="Mật khẩu"
            value={password}
            type={isShowPassword ? "text" : "password"}
            onChange={(value) => {
              setPassword(value);
            }}
          />
        </div>
        <div className="confirmPasswordFieldWrapper">
          <span
            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
          >
            {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
          </span>
          <InputForm
            className="confirmPasswordField"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            type={isShowConfirmPassword ? "text" : "password"}
            onChange={(value) => {
              setConfirmPassword(value);
            }}
          />
        </div>
        {/* {data?.status === 'false' && <span style={{ color: 'red' }}>{data?.messeage}</span>} */}
        <ButtonComponent
          // bordered="false"
          className="signupBtn"
          disabled={
            !name.length ||
            !email.length ||
            !phone.length ||
            !username.length ||
            !password.length ||
            !confirmPassword.length
          }
          size={40}
          textButton="ĐĂNG KÝ"
          onClick={hanleRegisterAccount}
        />
        <p>
          Bạn đã có tài khoản?
          <WrapperTextLight
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Đăng nhập?
          </WrapperTextLight>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
