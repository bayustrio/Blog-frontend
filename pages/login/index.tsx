import React, { useState } from "react";
import { Button, Spin } from "antd";
import Image from "next/image";
import Layout from "../layout/Layout";
import { setLogin } from "../Redux-actions/Action";
// STYLED COMPONENT
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import Router from "next/router";
import User from "../../images/user.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Link from "next/link";
import Error from "next/error";
// ===================================================

const index = () => {
  const dataLogin = useSelector((state: any) => state.dataLogin);
  const dispatch: any = useDispatch();
  const [load, setLoad] = useState<boolean>(true);
  const [toas, setToas] = useState<any>(null);
  // STATE LOGIN
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // BUTTON SUBMIT LOGIN PAGES
  const handleSubmit = (e: any) => {
    e.preventDefault();
      axios
        .post("https://blog-mern-api-node.herokuapp.com/api/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          const accessToken = res.data.token;
          Cookies.set("token", accessToken);
          Cookies.set('email', res.data.user.email)
          setLoad(false);
          setToas(toast.success("Login Success"));
          Router.push("/");
          
        })
        .catch((err) => {
          console.log(err.response.status,'<< ERROR THIS IS');
          console.log(err.response.data.message)
          const error:any = err.response.status
          if(error === 400) {
            toast.error(err.response.data.message)
          }else if (error === 404) {
            toast.error(err.response.data.message)
          }

          // toast.error('Invalid Username or Password');
        

          // const errorCode = <p>ErrorBroooo</p>
          // // setToas(toast.error("Login Failed"));
        });
  };

  return (
    <Layout>

      <body>
        <Toaster/>
        <section className="w3l-forms-23">
          <div className="forms23-block-hny">
            <div className="wrapper">
              {/* <h1>Trendz Login Form</h1> */}
              {/* <a className="logo" href="index.html">
					  <img src={avatar} alt="Your logo" title="Your logo" style={{height:'35px'}} />
					</a>  */}
              <div className="d-grid forms23-grids">
                <div className="form23">
                  <div className="main-bg">
                    <h6 className="sec-one">Hey good to see you again </h6>
                    <div className="speci-login first-look">
                      <div style={{ marginTop: "12px", textAlign: "center" }}>
                        <Image src={User} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="bottom-content">
                    <form action="#" method="post">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        name="email"
                        className="input-form"
                        placeholder="Input your Email"
                      />
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className="input-form"
                        placeholder="Your Password"
                      />
                      <button
                        onClick={handleSubmit}
                        className="loginhny-btn btn"
                      >
                        Login
                      </button>
                    </form>
                    <p>
                      Don't have an account?{" "}
                      <Link href="/register">Join Now!</Link>
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="w3l-copy-right text-center">
					<p>© 2020 Trendz Login Form. All rights reserved | Design by
						<a href="http://w3layouts.com/" target="_blank">W3layouts</a></p>
				</div> */}
            </div>
          </div>
        </section>
      </body>
    </Layout>
  );
};

export default index;
