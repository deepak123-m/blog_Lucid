import React, { useContext, useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { PiGifFill } from "react-icons/pi";
import { MdEmojiEmotions } from "react-icons/md";
import noteContext from "../Context/Notecontext";
let userImage = "";
const Createblog = () => {
  const context = useContext(noteContext);
  const { getUser, addPost} =
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

  const handleDescription = async (e) => {
    setPostImage({ ...postImage, description: e.target.value });
  };
  const handleTitle = async (e) => {
    setPostImage({ ...postImage, title: e.target.value });
  };
  const converToBase64 = (file) => {
    return new Promise((resolve, rejects) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        rejects(error);
      };
    });
  };

  const ImageSumbit = async (e) => {
    const file = e.target.files[0];

    const base64 = await converToBase64(file);
    setPostImage({ ...postImage, image: base64 });
  };

  const handlePost = async (e) => {
    e.preventDefault();

    await addPost(
      postImage.image,
      postImage.description,
      postImage.userName,
      postImage.user,
      postImage.name,
      postImage.profileimage,
      postImage.title
    );
    setPostImage({ ...postImage, image: "", description: "" });
    document.getElementById("post").value = document
      .getElementById("post")
      .getAttribute("placheolder");
    alert("successfully Posted");
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

  useEffect(() => {
    callUser();
  }, []);
  return (
    <div className="w-full h-[750px] bg-yellow-100 ">
      <div className="p-4  ">
        <div className=" bg-white rounded-lg shadow-lg bg-">
          <div className="h-14  items-center flex justify-center ">
            <div className="w-1/2    mt-3 font-sans justify-center flex  font-medium cursor-pointer">
              Post Blog{" "}
            </div>{" "}
          </div>

          <div className="h-[22%] gap-5 flex ">
            <div className=" pl-4 ml-1 pt-5">
              <img
                alt="error"
                className="w-12 h-12 inline rounded-full"
                src={userImage}
              />
            </div>

            <div className="w-full">
              <form>
                <input
                  className=" w-full my-5 placeholder:text-xl  placeholder:text-gray-600 font-medium outline-none  "
                  onChange={(e) => handleTitle(e)}
                  type="text"
                  placeholder="Enter Title"
                  id="posttitle"
                />
              </form>
              <form>
                <input
                  className=" w-full my-5 placeholder:text-xl  placeholder:text-gray-600 font-medium outline-none  "
                  onChange={(e) => handleDescription(e)}
                  type="text"
                  placeholder="Tell Story.."
                  id="post"
                />
              </form>

              <div className="text-blue-400 flex items-center text-[15px] pb-2 gap-2 font-medium">
                {" "}
                <BsGlobeCentralSouthAsia /> Everyone can reply
              </div>

              <div className="w-[90%] h-[0.2px] my-2"></div>

              <div className=" text-blue-400 flex justify-between my-3 w-full">
                <div className="flex gap-5 items-center ">
                  <form>
                    <input
                      onChange={(e) => ImageSumbit(e)}
                      className="w-0 h-0 visibility: hidden "
                      type="file"
                      name="postImage"
                      label="Image"
                      id="image"
                    />
                    <label className="cursor-pointer" for="image">
                      <FaRegImage />
                    </label>
                  </form>

                  <PiGifFill size="19px" />
                  <MdEmojiEmotions size="19px" />
                </div>
                <div>
                  {" "}
                  <button
                    onClick={(e) => handlePost(e)}
                    className="bg-blue-500  w-16 font-bold text-white h-8  mr-3 rounded-2xl"
                    type="submit"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createblog;
