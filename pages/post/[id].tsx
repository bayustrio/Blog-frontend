import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Layout from '../layout/Layout';
import { useRouter } from "next/router";
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {postComment} from '../Redux-actions/Action';
import styles from "../../styles/layout.module.css";
import Highlight from 'react-highlight'

const id = () => {
  const {TextArea} = Input;
  const dispatch = useDispatch();
    const [dataId, setDataId] = useState([]);
    const [comment, setComment] = useState([]);
    const router = useRouter();
    const [text, setText] = useState<string>('');
   

    let {id} = router.query

    useEffect(() => {
      axios.get(`https://blog-mern-api-node.herokuapp.com/api/post/${id}`)
      .then((res) => {
        console.log(res.data)
        setDataId(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },[id])


    const addComment = (e:any) => {
      e.preventDefault();
      // console.log(userId, '<< iddd')
      dispatch(postComment(text,id))
    }


  return (
    <Layout>
      <div className="container">
        <div style={{display:'flex', justifyContent:'center'}}>
      <div style={{ width: "60%" ,minHeight:'100vh'}} className={`${styles.card} ui card`}>
  {/* <div className="content"> */}
    {/* <div className="right floated meta">14h</div> */}
    {/* <img className="ui avatar image" src="/images/avatar/large/elliot.jpg"/> */}
  {/* </div> */}
  <div className="image">
    <img src={dataId.image} />
  </div>
  <div className="content">
    <p style={{fontWeight:'bold'}}>{dataId.author?.email}</p>
    <span className="right floated">
      {/* <i className="heart outline like icon"></i> */}
    </span>
    <h1 style={{fontWeight:'bold',fontSize:'2.5rem'}}>{dataId.title}</h1>
    <Highlight className='language-name-of-snippet' innerHTML={true}>
      {dataId.text}
</Highlight>

  </div>
  <div className="extra content">
    <h1 style={{fontSize:'2.5rem'}}>Discussion</h1>
      <Form.Item>
      <TextArea rows={4} value={text} onChange={(e) => {
        setText(e.target.value)
        console.log(text)
      }}  />
    </Form.Item>
    <Form.Item>
      <Button  key={dataId.author?._id} onClick={addComment} type="primary">
        Add Comment
      </Button>
    </Form.Item>
    {dataId.comments?.map((item:any, index:any) => {
      <Comment
            author={item.author?.email}
            content={item.comments?.text}
            datetime={item.comments?.date}
          />
    })}
    </div>
  </div>
</div>
</div>
    
    </Layout>
  )
}

export default id