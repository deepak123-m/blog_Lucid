import { MdOutlineMoreHoriz } from "react-icons/md";
import { BsChat } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
import { MdOutlineSort } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import Blogitem from "./Blogitem";

import noteContext from "../Context/Notecontext";
import React, { useContext, useEffect, useState } from "react";

let userImage = "";

const Content = () => {
  const context = useContext(noteContext);
  const { getUser,  post, getPost, updatePostLike, updatePostRetweet } =
    context;
  const [postImage, setPostImage] = useState({
    image: "",
    description: "",
    name: "",
    userName: "",
    user: "",
    profileimage: "",
    title: "",
  });

  const [Search, setSearch] = useState({ searchTitle: "" });

  console.log("Searchhhhh");
  console.log(Search);

  const handleSearch = async (e) => {
    setSearch({ searchTitle: e.target.value });
  };

  

  const callUser = async () => {
    const users = await getUser();

    setPostImage({
      ...postImage,
      name: users.name,
      userName: users.userName,
      user: users._id,
      profileimage: users.image,
    });
    userImage = users.image;
  };

  const handleLike = async (index, _id) => {
    let postIndex = false;
    postIndex = post[index].likes.includes(postImage.user);
    if (postIndex === false) {
      document.querySelectorAll("svg#heart")[index].setAttribute("fill", "red");
    } else {
      document
        .querySelectorAll("svg#heart")
        [index].setAttribute("fill", "Gray");
    }

    await updatePostLike(_id, postImage.user);
  };

  const handleRetweet = async (index, _id) => {
    let postIndex = false;
    postIndex = post[index].retweets.includes(postImage.user);
    if (postIndex === false) {
      document
        .querySelectorAll("svg#retweet")
        [index].setAttribute("fill", "green");
    } else {
      document
        .querySelectorAll("svg#retweet")
        [index].setAttribute("fill", "Gray");
    }
    await updatePostRetweet(_id, postImage.user);
  };

  const fetchPost = async () => {
    await getPost();
  };

  useEffect(() => {
    callUser();
    fetchPost();
  }, []);

  return (
    <div className="w-full  bg-yellow-100   h-full  ">
      <div class="flex items-center w-full h-[20%] justify-center ">
        <h1 class="text-4xl font-extrabold text-gray-800 tracking-wide">
          Welcome to
        </h1>
        <h2 class="text-6xl font-bold text-blue-600 tracking-wider ml-2">
          Deepak blog's
        </h2>
      </div>
      <div className="flex w-fit  bg-white rounded-2xl  px-4 mx-4">
        <BsSearch size={30} className="my-4 mr-4" />
        <form>
          <div className="flex">
            <input
              className=" w-full my-5  placeholder:text-xl  placeholder:text-gray-600 font-medium focus:outline-none  "
              type="text"
              placeholder="Search Blogs Here..."
              id="post"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </form>
      </div>

      <div className="grid grid-cols-3 bg-yellow-100  gap-4">
        {Search.searchTitle === ""
          ? post &&
            post.map(
              (
                {
                  image,
                  description,
                  userName,
                  name,
                    user,
                  _id,

                  profileimage,
                  title,
                  date,
                },
                index
              ) => {
                return (
                  <Blogitem
                    BsChat={BsChat}
                    MdOutlineMoreHoriz={MdOutlineMoreHoriz}
                    BsSearch={BsSearch}
                    MdOutlineSort={MdOutlineSort}
                    FaHeart={FaHeart}
                    AiOutlineRetweet={AiOutlineRetweet}
                    post={post}
                    postImage={postImage}
                    handleRetweet={handleRetweet}
                    handleLike={handleLike}
                    image={image}
                    description={description}
                    userName={userName}
                    name={name}
                    _id={_id}
                    profileimage={profileimage}
                    title={title}
                    mainname={postImage.name}
                    date={date}
                    index={index}
                    user={user}
                  />
                );
              }
            )
          : post &&
            post.map(
              (
                {
                  image,
                  description,
                  userName,
                  name,

                  _id,

                  profileimage,
                  title,
                  date,
                },
                index
              ) => {
                if (title === Search.searchTitle) {
                  return (
                    <Blogitem
                      BsChat={BsChat}
                      MdOutlineMoreHoriz={MdOutlineMoreHoriz}
                      BsSearch={BsSearch}
                      MdOutlineSort={MdOutlineSort}
                      FaHeart={FaHeart}
                      AiOutlineRetweet={AiOutlineRetweet}
                      post={post}
                      postImage={postImage}
                      handleRetweet={handleRetweet}
                      handleLike={handleLike}
                      image={image}
                      description={description}
                      userName={userName}
                      name={name}
                      _id={_id}
                      profileimage={profileimage}
                      title={title}
                      mainname={postImage.name}
                      date={date}
                      index={index}
                    />
                  );
                }
              }
            )}
      </div>
    </div>
  );
};

export default Content;
