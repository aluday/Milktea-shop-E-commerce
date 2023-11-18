import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { WrapperTextLight } from "./AccountWrapper";
import InputForm from "../../shared-components/InputForm";
import ButtonComponent from "../../shared-components/Button";
import logo from "../../../assets/logo.png";
import "./Account.css";

export const SigninPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="accountContainer">
      <div className="signinForm">
        <img alt="logo" width="130px" height="40px" src={logo} />
        <p className="signinText">ĐĂNG NHẬP</p>
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
            placeholder="Mật khẩu"
            type={isShowPassword ? "text" : "password"}
            value={password}
            onChange={(value) => {
              setPassword(value);
            }}
          />
        </div>
        {/* {data?.status === 'false' && <span style={{ color: 'red' }}>{data?.messeage}</span>} */}
        <ButtonComponent
          className="signinBtn"
          disabled={!username || !password}
          size={40}
          textButton="ĐĂNG NHẬP"
          onClick={() => {}}
        />
        <p>
          Chưa có tài khoản?
          <WrapperTextLight
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            Tạo tài khoản?
          </WrapperTextLight>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
