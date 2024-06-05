import React from "react";
import { Link } from "react-router-dom";

const Blogitem = (props) => {
  const {
    BsChat,
    MdOutlineMoreHoriz,
    MdOutlineSort,
    FaHeart,
    AiOutlineRetweet,
    post,
    postImage,
    handleRetweet,
    handleLike,
    image,
    description,
    userName,
    name,
    _id,
    profileimage,
    title,
    mainname,
    date,
    index,
  } = props;

 

  return (
    <div
      key={_id}
      className=" m-4 bg-gray-100 flex justify-center items-center transform transition duration-500  hover:scale-105 rounded-xl shadow-lg p-6 "
    >
      <Link
        to="/blogs"
        state={{
          posts: post,
          postImages: postImage,
          images: image,
          descriptions: description,
          userNames: userName,
          names: name,
          _ids: _id,
          profileimages: profileimage,
          titles: title,
          mainnames: mainname,
          indexs: index,
        }}
      >
        <div className=" ">
          <div className="    ml-4 pt-5">
            <div>
              <div className="flex ">
                <div className="flex-row  ">
                  <div className="flex flex-col justify-center items-center ml-4">
                    <img
                      alt="error"
                      className="w-12 h-12 inline rounded-full"
                      src={profileimage}
                    />
                    <div className="text-gray-500"> @{userName}</div>
                    <div className="flex m-1 flex-row font-bold gap-1">
                      Author:{" "}
                      <div className="w-full text-pink-600"> {name}</div>
                    </div>
                    <div className="flex m-1 flex-row font-bold gap-1">
                      Date:{" "}
                      <div className="w-full text-purple-500"> {date}</div>
                    </div>
                  </div>
                  <div className="m-4 justify-center align-middle items-center  flex flex-col">
                    {image ? (
                      <img
                        className="w-full  rounded-xl   h-full"
                        src={image}
                        alt="error"
                      />
                    ) : (
                      ""
                    )}

                    <div className="font-bold  ">{title}</div>

                    <div className="">{description.substring(0, 26)}...</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between  pb-4  text-gray-500">
              <div className="flex text-gray-500 gap-2 items-center text-[13px]">
                <BsChat size="15px" />0
              </div>
              <div className="flex  cursor-pointer gap-2 items-center  text-[13px]">
                <div>
                  <AiOutlineRetweet
                    id="retweet"
                    onClick={() => handleRetweet(index, _id)}
                    size="15px"
                    fill={
                      post[index].retweets.includes(postImage.user)
                        ? "Green"
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
                    onClick={() => handleLike(index, _id)}
                    size="12px"
                    fill={
                      post[index].likes.includes(postImage.user)
                        ? "red"
                        : "Gray"
                    }
                  />
                  {}
                </div>

                <div className="text-gray-500">{post[index].likes.length}</div>
              </div>
              <div className="flex text-gray-500 gap-2 items-center text-[13px]">
                <MdOutlineSort size="15px" />1
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Blogitem;
