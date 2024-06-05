import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import noteContext from "../Context/Notecontext";
import Comments from "./Comments";

const Blogs = () => {
  const location = useLocation();
  let context = useContext(noteContext);
  const { addComment, getComment, commentAll } = context;

  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  console.log("comment all");
  console.log(commentAll);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment(location.state.mainnames, location.state._ids, comment);
    await getComment();
    setComment("");
  };

  const fetchComments = async () => {
    await getComment();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <div className="bg-yellow-100 p-8">
        <div
          key={location.state._ids}
          className="border-r bg-white m-20 rounded-xl shadow-lg p-8 "
        >
          <div className="min-h-[60%] border-b ">
            <div className="     ml-4 pt-5">
              <div>
                <div className="flex  ">
                  <img
                    className="w-12 h-12 inline rounded-full"
                    src={location.state.profileimages}
                    alt="error"
                  />

                  <div className="flex-row w-[85%] ">
                    <div className="flex ml-4">
                      <div className="text-gray-500">
                        {" "}
                        @{location.state.userNames}
                      </div>
                    </div>

                    <div className="m-4  flex flex-col">
                      {location.state.images ? (
                        <img
                          className="w-[80%]  rounded-xl   h-full"
                          src={location.state.images}
                          alt="error"
                        />
                      ) : (
                        ""
                      )}

                      <div className="font-bold  ">
                        Title: {location.state.titles}
                      </div>
                      <div className="flex flex-row font-bold gap-1">
                        Author By:{" "}
                        <div className="text-pink-600">
                          {" "}
                          {location.state.names}
                        </div>
                      </div>
                      <div className="">
                        Description: {location.state.descriptions}.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto ">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="comment"
              >
                Add a comment:
              </label>
              <textarea
                id="comment"
                name="comment"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Write your comment here..."
                value={comment}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-5xl bg-yellow-100 flex justify-center items-center pb-4 font-extrabold text-blue-600">
        Checout The Latest comments Below
      </div>

      <div className="grid grid-cols-3 bg-yellow-100  gap-4">
        {commentAll &&
          commentAll.map((item) => {
            console.log(item.postId);
            if (item.postId === location.state._ids) {
              return (
                <Comments
                  name={item.name}
                  date={item.date}
                  postId={item.postId}
                  comments={item.comments}
                />
              );
            }
          })}
      </div>
    </>
  );
};

export default Blogs;
