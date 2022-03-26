import React, {useEffect, useState } from "react";
import Layout from "../layout/Layout";

// MKEDITOR CONFIG
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import dynamic from "next/dynamic";
import Cookies from 'js-cookie';
import axios from "axios";
// ===============END====================

const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})

const index = () => {
  
  // STATE
  const [body,setBody] = useState<any>("");
  const [title,setTitle] = useState<string>("");

  const handleChangeEditor = (value:any) => {
    // GET onchange in react quill editor
    setBody({value})
  
    console.log(body)
  }


    const handlePost = (e:any) => {
      e.preventDefault();
    axios.post('https://blog-test-api-mern.herokuapp.com/blogPost/add',
    {body: body,
      title:title,
      username: Cookies.get('username')
    },{
      headers: {
        "authorization": ` ${Cookies.get('token')}`
      }
    }
    )
    .then((res) => {
      console.log(res.data)
      alert('BERHASIL')
    })
    .catch(err => console.log(err))
  }


  // MODULE AND FORMAT EDITOR
  const modules:any = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
 
   const formats:any = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

// ===============END====================

  return (
    <Layout>
      <div>
        <h1>Create Post</h1>
        <input placeholder="Your title"
          value={title} onChange={(e) =>{
            setTitle(e.target.value)
            console.log(title)
            }}/>
        
        <QuillNoSSRWrapper
        value={body}
        onChange={setBody}
          modules={modules} formats={formats}  theme="snow" />
      </div>
      <button onClick={handlePost}>SUBMIT</button>
      <div>
        {body}
        </div>
    </Layout>
  );
};

export default index;
