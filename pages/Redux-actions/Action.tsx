import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import toast, { Toaster } from 'react-hot-toast';


export const setLogin = (username: string, password: string) => {
  return (dispatch: any) => {
    //   toast.loading('Loading...')
    axios
      .post("https://blog-test-api-mern.herokuapp.com/user/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        // const token = res.data.token;
        console.log(res.data)
        // Cookies.set("token", token);
        // dispatch({
        //   type: "SET_LOGIN",
        //   payload: res.data,
        // });
        toast.success("Login Success")
        Router.push("/")
      })
      .catch((res) => {
        console.log(res,'<<< ERROR');
        toast.error("Login Failed")
      });
  };
};

export const setRegister = (username: string, password: string, email: string) => {
  return (dispatch: any) => {
    axios
      .post("https://blog-test-api-mern.herokuapp.com/user/register", {
        username: username,
        password: password,
        email: email,
      })
      .then((res) => {
        toast.success('Successfully Registered"')
        // console.log(res.data);
        dispatch({
          type: "SET_REGISTER",
          payload: res.data,
        });
        Router.push('/login')
      })
      .catch((err) => {
        toast.error('Upps, Something Wrong')
        console.log(err);
      });
  };
};
