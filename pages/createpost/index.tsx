import React, { useEffect, useRef, useState } from "react";
import Layout from "../layout/Layout";
import { convertToHTML } from "draft-convert";
// MKEDITOR CONFIG
import axios from 'axios';
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { setDataPost } from "../Redux-actions/Action";
import { Image } from "antd";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { EditorState } from "draft-js";
// ===============END====================
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorProps } from "react-draft-wysiwyg";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useMutation } from 'react-query'
import toast,{Toaster} from "react-hot-toast";


const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const index = () => {
  const dispatch = useDispatch();
  // STATE
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<any>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [editorState, setEditorState] = useState<any>(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState<any>(null);

  const handleEditorChange = (state: any) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML: any = convertToHTML(
      editorState.getCurrentContent()
    );
    setConvertedContent(currentContentAsHTML);
  };
  // ==========END==========

  const handleImage = (e: any) => {
    setImage(e.target.files[0]);
    // setImagePreview(URL.createObjectURL(e.target.files[0]))
    console.log(image, "<<image");
    console.log(e.target);
  };

  const styles = {
    editor: {
      backgroundColor: "#fff",
      minHeight: "40vh",
      lineHeight: "10px",
    },
  };



  const handlePost = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", convertedContent);
    formData.append("description", description);
    formData.append("image", image);

    try{

      const res = await axios.post("https://blog-mern-api-node.herokuapp.com/api/post", formData, {
        headers: {
          "x-access-token": ` ${Cookies.get("token")}`,
        },
      })
      console.log(res.data)
      toast.success("Post Success")
    }
    catch(err){
      console.log(err)
      // toast.error(err.response.data.message)
    }
  };

  // ===============END====================
 
  return (
    <Layout>
      <div style={{ backgroundColor: "#F5F4F4" }}>
        <Toaster/>
        <div className="container">
          <div>
            <h1>Create Post</h1>
            <input
              placeholder="Your title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                console.log(title);
              }}
            />

            <p>Image Upload</p>
            <input
              type="file"
              placeholder="Upload Image in here"
              onChange={handleImage}
            />
            <Image src={imagePreview} width={100} />
            <div style={styles.editor}>
              {/* <input value={text} onChange={(e) => setText(e.target.value)} /> */}
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </div>

            <p>Description</p>
            <input
              value={description}
              placeholder="Your description"
              onChange={(e) => {
                setDescription(e.target.value);
                console.log(description);
              }}
            />
          </div>
          <button onClick={handlePost}>SUBMIT</button>
        </div>
      </div>
    </Layout>
  );
};
export default index;
