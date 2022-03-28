import React, { useState } from "react";
import axios from "axios";
import { Checkbox, Button } from "antd";
import { setRegister } from "../Redux-actions/Action";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Router from "next/router";
import Layout from "../layout/Layout";
import toast, { Toaster } from "react-hot-toast";

const index = () => {
  // DISPATCH
  const dispatch = useDispatch();
  // =======================================================
  const [load, setLoad] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmitRegis = (e: any) => {
    e.preventDefault();

    setLoad(true);
   
        dispatch(setRegister(password,email))
        setLoad(false);
  };

  return (
    <Layout>
        <Toaster/>
      <div className="register">
        <div className="banner-register">
          <div className="text-welcome">
            <h1>CREATE ACCOUNT</h1>
          </div>
        </div>

        <div className="right-register">
          <div className="form-register">
            <div className="register-input">
              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "10px",
                  fontWeight: "500",
                  color: "#BD783A",
                }}
              >
                Create Your Account, It's Free.
              </p>

              {/* USERNAME INPUT */}
              <div style={{display:'flex',flexDirection:'column'}}>
</div>
              {/* EMAIL INPUT */}
              <p className="text-regis">Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input-register"
                placeholder="Enter your email"
              />

              {/* PASSWORD INPUT */}
              <p className="text-regis">Password</p>
              <input
                type="password"
                className="input-register"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
              />

              <Button
                onClick={handleSubmitRegis}
                loading={load}
                className="register-btn"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
