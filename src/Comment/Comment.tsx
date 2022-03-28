import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {postComment} from '../../pages/Redux-actions/Action';
import Cookies from "js-cookie";
import Router from "next/router";


import toast, { Toaster } from "react-hot-toast";


const Comment = (item:any) => {
    // console.log(item.item?.author._id,'thisis key')
  const [comment, setComment] = useState<string>("");
  const dispatch = useDispatch();
  

  const handlePost = (e: any) => {
    e.preventDefault();
    let id = item.item._id
    if(Cookies.get('token') === undefined) {
      toast.error('Harap Login Dahulu!')
    }
    else{
      dispatch(postComment(comment, id))
      setComment('')
      // Router.push(`/post/${id}`)
    }

  };

  return (
    <div className="extra content">
  
      <div className="ui large transparent left icon input">
        <i className="heart outline icon"></i>
        <input
        key={item.item?.author._id}
          type="text"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Add Comment..."
        />

      </div>
        <span className="right floated">
          <FaPaperPlane onClick={handlePost} />
        </span>
    </div>
  );
};

export default Comment;