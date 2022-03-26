import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {postComment} from '../../pages/Redux-actions/Action';

const Comment = (item:any) => {
    console.log(item.item?.author._id,'thisis key')
  const [comment, setComment] = useState<string>("");
  const dispatch = useDispatch();

  const handlePost = (e: any) => {
    e.preventDefault();
    let id = item.item._id
    dispatch(postComment(comment, id))

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
            console.log(comment)
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