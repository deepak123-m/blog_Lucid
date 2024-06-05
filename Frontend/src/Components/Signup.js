import { React, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaRegImage } from "react-icons/fa6";

const Signup = () => {
  let navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    name: "",
    userName: "",
    image: "",
  });

  const handleUserName = async (e) => {
    setUserDetails({ ...userDetails, userName: e.target.value });
  };

  const handleName = async (e) => {
    setUserDetails({ ...userDetails, name: e.target.value });
  };

  const handlePassword = async (e) => {
    setUserDetails({ ...userDetails, password: e.target.value });
  };
  const handleEmail = async (e) => {
    setUserDetails({ ...userDetails, email: e.target.value });
  };

  const handlieSignUp = async (e) => {
    e.preventDefault();

    const response = await fetch("https://myblog-backend-7hyi.onrender.com/blog/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: userDetails.email,
        password: userDetails.password,
        name: userDetails.name,
        userName: userDetails.userName,
        image: userDetails.image,
      }),
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/login");
    } else {
      alert("Invalid credentials");
    }
    document.getElementsByTagName("input")[0].value = document
      .getElementsByTagName("input")[0]
      .getAttribute("plasceholder");
    document.getElementsByTagName("input")[1].value = document
      .getElementsByTagName("input")[1]
      .getAttribute("placseholder");
    document.getElementsByTagName("input")[2].value = document
      .getElementsByTagName("input")[2]
      .getAttribute("placesholder");
    document.getElementsByTagName("input")[3].value = document
      .getElementsByTagName("input")[3]
      .getAttribute("placesholder");
    setUserDetails({
      email: "",
      password: "",
      name: "",
      userName: "",
      image: "",
    });
  };

  const ImageSumbit = async (e) => {
    const file = e.target.files[0];
    const base64 = await converToBase64(file);
    setUserDetails({ ...userDetails, image: base64 });
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

  return (
    <div className="w-screen h-screen md:flex bg-yellow-100 items-center justify-center">
      <div className="md:flex items-center  justify-evenly w-[80%]">
        <div>
          <img
            className="ml-5 rounded-2xl"
            width={"500px"}
            src="https://st3.depositphotos.com/7865540/13629/i/450/depositphotos_136293076-stock-photo-technology-blog-concept.jpg"
            alt="twitter-logo"
          />
        </div>
        <div className="ml-10 md:ml-0 my-2">
          <div className="my-5">
            <h1 className="font-bold text-3xl md:text-6xl">Welcome to my Blog's</h1>
          </div>
          <h1 className="mt-4 mb-2 md:text-3xl font-bold">SignUp</h1>
          <form className="flex flex-col md:w-[55%]">
            {
              <>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => handleName(e)}
                  className="outline-blue-500 border  border-gray-600 px-3 py-2   rounded-full my-1 font-semibold"
                />
                <input
                  type="text"
                  placeholder="Type"
                  onChange={(e) => handleUserName(e)}
                  className="outline-blue-500 border  border-gray-600 px-3 py-2  rounded-full my-1 font-semibold"
                />
              </>
            }
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => handleEmail(e)}
              className="outline-blue-500 border  border-gray-600 px-3 py-2   rounded-full my-1 font-semibold"
            />
            <input
              type="password"
              autoComplete="on"
              placeholder="Password"
              onChange={(e) => handlePassword(e)}
              className="outline-blue-500 border  border-gray-600 px-3 py-2  rounded-full my-1 font-semibold"
            />
            <input
              onChange={(e) => ImageSumbit(e)}
              className="w-0 h-0 visibility: hidden "
              type="file"
              name="postImage"
              label="Image"
              id="image"
            />
            <label
              className="cursor-pointer outline-blue-500 border  w-[15%] border-gray-600 px-3 py-2   my-1 rounded-full font-semibold"
              htmlFor="image"
            >
              <FaRegImage size="22PX" />
            </label>
            <button
              className="bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg "
              onClick={(e) => handlieSignUp(e)}
            >
              SignUp
            </button>
            <h1 className="">
              {" "}
              Already have an account?{" "}
              <Link to="/login">
                <span className="font-bold text-blue-600 cursor-pointer">
                  Login
                </span>
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
