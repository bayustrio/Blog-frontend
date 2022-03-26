import React, { useState, useEffect } from "react";
import axios from "axios";
// ======TIME AGO======
import TimeAgo from "javascript-time-ago";
// ======END======
import ReactTimeAgo from "react-time-ago";
import styles from "../../styles/layout.module.css";
import Router from "next/router";
import Link from "next/link";
import { useRouter } from "next/router";
import { postComment } from "../Redux-actions/Action";
import { useQuery } from "react-query";
import Loading from "../Screen/Loading";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../../src/Comment/Comment";
import en from "javascript-time-ago/locale/en.json";

const index = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  TimeAgo.addDefaultLocale(en);

  const handleChange = (e: any) => {
    const keyw = e.target.__reactFiber$9iad0hmkj?.key;
    let { id } = router.query;
    if (keyw === id) {
      setComment(e.target.value);
      console.log(comment);
    } else {
      return;
    }
    // console.log(keyw)
  };

  const handlePost = (e: any) => {
    e.preventDefault();
    const { id } = router.query;
    dispatch(postComment(comment, id));
  };

  const DATAPOST = async () => {
    const { data } = await axios.get(
      "https://blog-mern-api-node.herokuapp.com/api/posts"
    );
    return data;
  };

  const { isLoading, error, data } = useQuery("data", DATAPOST);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <h1>Upps {error}</h1>;
  }

  const getData = data.posts.map((item: any, index: any) => (
    <div style={{ padding: "10px 0" }} key={item._id}>
      <div style={{ width: "550px" }} className={`${styles.card} ui card`}>
        <div
          className="image "
          onClick={(e) => {
            e.preventDefault();
            router.push(`/post/${item._id}`);
          }}
        >
          <img className="image " src={item.image} />
        </div>
        <div className="content">
          <p>{item.author?.email}</p>

          <p style={{ fontSize: "1.3rem" }}>
            <strong>{item.title}</strong>
          </p>
          <div className="meta">
            <ReactTimeAgo date={item.date} locale="en-US" className="date" />
          </div>

          <span className="right floated">
            <i className="heart outline like icon"></i>
          </span>
          {/* {item.likes} */}
          <i className="comment icon"></i>
          {item.comments.length}
        </div>
        <Comment item={item} />
      </div>
    </div>
  ));

  return <div>{getData}</div>;
};

export default index;
