import React from "react";

const Comments = (props) => {
  const { name,  comments, date } = props;
  return (
    <div className="bg-gray-100 m-4 p-8">
      <div className="comment">
        <p>Comment: {comments}</p>
        <div className="meta flex flex-col">
          <div className="flex  flex-row font-bold gap-1">
            Author: <div className="w-full text-pink-600"> {name}</div>
          </div>
          <div className="flex  flex-row font-bold gap-1">
            Date: <div className="w-full text-blue-900"> {date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
