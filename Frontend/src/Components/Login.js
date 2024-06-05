import { React, useContext, useState } from "react";
import noteContext from "../Context/Notecontext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const context = useContext(noteContext);
  const { loginUser } = context;
  const [login, setlogin] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleEmail = (e) => {
    setlogin({ ...login, email: e.target.value });
  };
  const handlePassword = (e) => {
    setlogin({ ...login, password: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginUser(login.email, login.password);

    if (res.success) {
      localStorage.setItem("token", res.authtoken);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }

    document.getElementsByTagName("input")[0].value = document
      .getElementsByTagName("input")[0]
      .getAttribute("plasceholder");
    document.getElementsByTagName("input")[1].value = document
      .getElementsByTagName("input")[1]
      .getAttribute("placseholder");
  };
  return (
    <div className="w-screen h-screen bg-yellow-100 md:flex items-center justify-center">
      <div className="md:flex items-center justify-evenly w-[80%]">
        <div>
          <img
            className="ml-5 rounded-2xl"
            width={"500px"}
            
            src="https://st3.depositphotos.com/7865540/13629/i/450/depositphotos_136293076-stock-photo-technology-blog-concept.jpg"
            alt="twitter-logo"
          />
        </div>
        <div className="ml-10 md:ml-0 my-2">
          <div className="my-5 ">
            <h1 className="font-bold text-3xl md:text-6xl">Welcome to my Blog's</h1>
          </div>
          <h1 className="mt-4 mb-2 text-2xl  font-bold">Login</h1>
          <form className="flex flex-col md:w-[55%]">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => handleEmail(e)}
              className="outline-blue-500 border bg-black border-gray-600 px-3 py-2 placeholder:text-white text-white  rounded-full my-1 font-semibold"
            />
            <input
              type="password"
              autoComplete="on"
              onChange={(e) => handlePassword(e)}
              placeholder="Password"
              className="outline-blue-500 border bg-black border-gray-600 px-3 text-white placeholder:text-white py-2 rounded-full my-1 font-semibold"
            />
            <button
              onClick={(e) => handleLogin(e)}
              className="bg-[#1D9BF0] border-none  py-2 my-4 rounded-full text-lg text-white"
            >
              Login
            </button>
            <h1 className=" ">
              {" "}
              Do not have an account?{" "}
              <Link to="/signup">
                {" "}
                <span className="font-bold text-blue-600 cursor-pointer">
                  Signup
                </span>
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;