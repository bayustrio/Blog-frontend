import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import toast from "react-hot-toast";

// =============POST COMMENT=============
export const postComment = (comment: string,id: any) => {
  return () => {
    // const date = Date.now()
    // let minute = date.getMinutes()
   const data ={
     text: comment,
     postId: id
    //  date: 
   }
    axios.post("https://blog-mern-api-node.herokuapp.com/api/comment", data, {
      headers: {
        "x-access-token": ` ${Cookies.get("token")}`,
      }
    })
    .then((res) => {
      toast.success('Comment Berhasil')
    })
    .catch(err => console.log(err.response.data.message))
   
  };
};
// =============END=============

// =============GET POST =============
export const getPostAll =  () => {
  return (dispatch:any) => {
    axios.get('https://blog-mern-api-node.herokuapp.com/api/posts')
    .then((res) => {
      dispatch({
        type:'GET_DATA',
        payload:res.data.posts
      })
    })
    .catch((err) => {
      const error = err.response.data.message
      console.log(error)
    })
  }
}

// =============END=============


export const setLogin = (username: string, password: string) => {
  return (dispatch: any) => {
    //   toast.loading('Loading...')
    axios
      .post("https://blog-test-api-mern.herokuapp.com/user/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        toast.success("Login Success");
        Router.push("/");
      })
      .catch((res) => {
        console.log(res, "<<< ERROR");
        toast.error("Login Failed");
      });
  };
};

export const setDataPost = (title: string,image: any,editorState: any,description: string) => {
  return () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", editorState);
    formData.append("description", description);
    formData.append("image", image);

    axios
      .post("https://blog-mern-api-node.herokuapp.com/api/post", formData, {
        headers: {
          "x-access-token": ` ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        alert("BERHASIL");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };
};

export const setRegister = (
  password: string,
  email: string,
) => {
  return (dispatch: any) => {
    axios
      .post("https://blog-mern-api-node.herokuapp.com/api/register", {
        password: password,
        email: email,
      })
      .then((res: any) => {
        toast.success('Successfully Registered"');
        dispatch({
          type: "SET_REGISTER",
          payload: res.data,
        });
        Router.push("/login");
      })
      .catch((err) => {
        toast.error("Upps, Something Wrong");
        console.log(err);
      });
  };
};
