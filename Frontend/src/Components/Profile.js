import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { BsChat } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { MdOutlineSort } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import noteContext from "../Context/Notecontext";
import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { disconnect } from "mongoose";

let count = 0;

let folowlength = 0;
let folowerslength = 0;
let user_id = "";
let userfollowing = [];
let userfollowers = [];



const Profile = (props) => {
  let navigate = useNavigate();
  if (localStorage.getItem("token") === null) {
    navigate("/login");
  }

  const [folength, setfolength] = useState({ s: "", d: "" });
 const [status,setStatus] = useState("0")
  const location = useLocation();



  let context = useContext(noteContext);

  const {
    user,
    getUser,
    post,
    getPost,
    updatePostLike,
    updatePostRetweet,
    deletePost,
    disconSlack,
  } = context;

  const callUser = async () => {
    const userimag = await getUser();
    user_id = "";

    if (location.state.yes === "yes") {
      user_id = userimag._id;
      folowlength = 0;
      folowerslength = 0;
      folowlength = userimag.following.length;
      folowerslength = userimag.followers.length;
      userfollowers = [];
      userfollowers = [...userimag.followers];
      userfollowing = [];
      userfollowing = [...userimag.following];

      setfolength({ d: folowerslength, s: folowlength });
    }
  };

  const handleLike = async (_id, likes) => {
    let postIndex = false;
    postIndex = likes.includes(user_id);

    await updatePostLike(_id, user_id);
  };

  const handleRetweet = async (_id, retweets) => {
    let postIndex = false;
    postIndex = retweets.includes(user_id);

    await updatePostRetweet(_id, user_id);
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    deletePost(id);
  };

  const handleDisconnect = async (id) => {

    await disconSlack(id);

    alert("Successfully Disconnected webhook ")
    setStatus("1");
    location.state.hook = ""
    

  }

  const handleicondelte = (user_id, _id) => {
    if (user_id !== "") {
      return (
        <div
          onClick={(e) => handleDelete(user, _id, e)}
          className="mr-3 cursor-pointer mt-1"
        >
          <RiDeleteBin6Line />
        </div>
      );
    }
  };

  if (localStorage.getItem("token") === null) {
    navigate("/login");
  }

  const handleUserPost = (
    image,
    description,
    userName,
    name,
    user,
    _id,
    retweets,
    likes,
    profileimage,
    index
  ) => {
    if (user !== location.state.id) {
    } else {
      return (
        <div
          key={_id}
          className="border-r bg-white m-4 rounded-xl shadow-lg p-6 "
        >
          <div className="min-h-[60%] border-b ">
            <div className="     ml-4 pt-5">
              <div>
                <div className="flex gap-5">
                  <img
                    className="w-12 h-12 inline rounded-full"
                    src={profileimage}
                    alt="error"
                  />

                  <div className="flex-row w-[85%] ">
                    <div className="flex">
                      <div className="font-bold ">{name}</div>

                      <div className="text-gray-500"> @{userName}</div>
                    </div>
                    <div className="my-2">
                      <div className="">{description}</div>
                      {image ? (
                        <img
                          className="w-3/4 rounded-xl my-5  "
                          src={image}
                          alt="No added for this post"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {handleicondelte(user_id, _id)}
                </div>
              </div>
              <div className="flex ml-16 w-3/4 justify-between mr-11 pb-4  text-gray-500">
                <div className="flex text-gray-500 gap-2 items-center text-[13px]">
                  <BsChat size="15px" />1
                </div>
                <div className="flex  cursor-pointer gap-2 items-center  text-[13px]">
                  <div>
                    <AiOutlineRetweet
                      id="retweet"
                      onClick={() => handleRetweet(_id, retweets)}
                      size="15px"
                      fill={
                        retweets.includes(location.state.id) ||
                        retweets.includes(user_id)
                          ? "green"
                          : "Gray"
                      }
                    />
                  </div>
                  <div className="text-gray-500">
                    {post[index].retweets.length}
                  </div>
                </div>

                <div className="flex  cursor-pointer gap-2 items-center  text-[13px]">
                  <div>
                    <FaHeart
                      id="heart"
                      onClick={() => handleLike(_id, likes)}
                      size="12px"
                      fill={
                        likes.includes(location.state.id) ||
                        likes.includes(user_id)
                          ? "red"
                          : "Gray"
                      }
                    />
                    {}
                  </div>

                  <div className="text-gray-500">
                    {post[index].likes.length}
                  </div>
                </div>
                <div className="flex text-gray-500 gap-2 items-center text-[13px]">
                  <MdOutlineSort size="15px" />0
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
console.log("hook in profile")
console.log(location.state.hook)
  const fetchPost = async () => {
    const postCount = await getPost();

    count = 0;
    postCount.forEach((element) => {
      if (element.user === location.state.id) {
        count = count + 1;
      }
    });
  };
  useEffect(() => {
    fetchPost();

    callUser();
  }, []);
  return (
    <>
      <div className="bg-yellow-100">
        <div className="rounded-lg   overflow-hidden">
          <div className="flex justify-center bg-gray-200 rounded-xl shadow-lg p-6 m-4">
            <div className="font-bold justify-center text-3xl ">
              Profile of {location.state.nme}
            </div>
          </div>

          <div className="m-5 bg-white rounded-xl shadow-lg  ">
            <div className="flex items-center mb-4">
              <Link
                to="/"
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <IoMdArrowBack size="24px" />
              </Link>
              <div className="ml-4">
                <h1 className="font-bold text-lg">{location.state.nme}</h1>
                <p className="text-gray-500 text-sm">{count} Posts</p>
              </div>
            </div>
            <div className="ml-14">
              <img
                src={location.state.img}
                alt="banner"
                className="w-58 h-48 rounded-lg"
              />
            </div>

            <div className="ml-14">
              <h1 className="font-bold text-xl">{location.state.nme}</h1>
              <p>@{location.state.unme}</p>
            </div>
            <div className="flex ml-14 gap-5 mb-4">
              <Link
                to="/following"
                state={
                  location.state.yes === "yes"
                    ? { following: userfollowing ,id:location.state.id, current:"yes"}
                    : { following: location.state.flw }
                }
                className="text-blue-500 hover:underline"
              >
                <div>
                  {location.state.yes === "yes"
                    ? folength.s
                    : location.state.flw.length}{" "}
                  Following
                </div>
              </Link>
              <Link
                to="/followers"
                state={
                  location.state.yes === "yes"
                    ? { followers: userfollowers }
                    : { followers: location.state.flwrs }
                }
                className="text-blue-500 hover:underline"
              >
                <div>
                  {location.state.yes === "yes"
                    ? folength.d
                    : location.state.flwrs.length}{" "}
                  Followers
                </div>
              </Link>
            </div>

          {(location.state.yes === "yes" && location.state.hook !== "" && status === "0" )? (
              

            <button
            onClick={(e)=>handleDisconnect(location.state.id)}
            className=" border-2 bg-white ml-12 mb-4 py-1 pl-14 m-1 rounded-full text-lg">
          Disconnect with Slack Api 
          <img
          rel="noreferrer"
          src="https://yt3.googleusercontent.com/ytc/AIdro_nD88Qel1sWfD2NQ8tM1Ja2BJZuV-jgmUxc-VbpZX7XnkQ=s900-c-k-c0x00ffffff-no-rj"
          className="w-8 h-8 mx-3 inline  rounded-full"
          alt="error"
          />
      </button>
            ) : ("")}


            <div className="text-sm ml-12 pb-4">
              <p>
                🌐 Exploring the web's endless possibilities with MERN Stack 🚀
                | Problem solver by day, coder by night 🌙 | Coffee lover ☕ |
                Join me on this coding journey!
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center bg-gray-200 rounded-xl shadow-lg p-6 m-4">
          <div className="font-bold  justify-center text-3xl ">
            Blogs of {location.state.nme} ({count})
          </div>
        </div>
        {post &&
          post.map(
            (
              {
                image,
                description,
                userName,
                name,
                user,
                _id,
                retweets,
                likes,
                profileimage,
              },
              index
            ) => {
              return handleUserPost(
                image,
                description,
                userName,
                name,
                user,
                _id,
                retweets,
                likes,
                profileimage,
                index
              );
            }
          )}
      </div>
    </>
  );
};

export default Profile;
