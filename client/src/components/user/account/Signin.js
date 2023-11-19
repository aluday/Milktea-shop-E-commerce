import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { WrapperTextLight } from "./AccountWrapper";
import InputForm from "../../shared-components/InputForm";
import ButtonComponent from "../../shared-components/Button";
import logo from "../../../assets/logo.png";
import "./Account.css";
import * as messages from "../../../services/messages";
import {
  signin,
  getCurrentUser,
  handleError,
} from "../../../services/endpoint-services";

export const SigninPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = () => {
    signin({ username, password })
      .then((res) => {
        if (res && res.status === 200 && res.data && res.data.access_token) {
          localStorage.setItem("access_token", res.data.access_token);
          // call authorize to verify the token again to get the current user who logged in
          getCurrentUser(res.data.access_token)
            .then((res) => {
              if (res && res.data && res.data.currentUser) {
                localStorage.setItem(
                  "current_user",
                  JSON.stringify(res.data.currentUser)
                );
                navigate("/");
              }
            })
            .catch((err) => {
              handleError(err);
              messages.error();
            });
        }
      })
      .catch((err) => {
        handleError(err);
        messages.error();
      });
  };

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
          onClick={handleSignin}
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
