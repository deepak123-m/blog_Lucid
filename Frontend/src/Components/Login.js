import { React, useContext, useState } from "react";
import noteContext from "../Context/Notecontext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const context = useContext(noteContext);
  const { loginUser } = context;
  const [login, setlogin] = useState({ email: "", password: "", hook:"" });
  let navigate = useNavigate();
  const [slackStatus, setslackStatus] = useState("");

  const handleSlack = (e) => {
    setslackStatus("1");
  };

  const handleHook = (e) => {
    setlogin({ ...login, hook: e.target.value });
  }

  console.log(login)

  const handleEmail = (e) => {
    setlogin({ ...login, email: e.target.value });
  };
  const handlePassword = (e) => {
    setlogin({ ...login, password: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginUser(login.email, login.password,login.hook);

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

      setslackStatus("0");
  };
  return (
    <div className="w-screen h-screen bg-yellow-100 md:flex items-center  justify-center">
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
            <h1 className="font-bold text-3xl md:text-6xl">
              Welcome to my Blog's
            </h1>
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
           

            <a
              onClick={(e) => handleSlack(e)}
              href="https://api.slack.com/apps"
              className=" border-2 bg-white  py-1 pl-14 m-1 rounded-full text-lg"
              target="_blank"
            >
              Connect with Slack Api
              <img
                rel="noreferrer"
                src="https://yt3.googleusercontent.com/ytc/AIdro_nD88Qel1sWfD2NQ8tM1Ja2BJZuV-jgmUxc-VbpZX7XnkQ=s900-c-k-c0x00ffffff-no-rj"
                className="w-8 h-8 mx-3 inline rounded-full"
                alt="error"
              />
            </a>

            {slackStatus == "1" ? (
              <form className="bg-white border-2 mt-1 rounded-lg shadow-md  px-8 pt-2  ">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="fname"
                  >
                    Enter Channel Webhook here:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id="fname"
                    name="fname"
                    onChange={(e)=>handleHook(e)}
                  />
                </div>
              </form>
            ) : (
              ""
            )}

<button
              onClick={(e) => handleLogin(e)}
              className="bg-[#1D9BF0] border-none  py-2 mt-4 rounded-full text-lg text-white"
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
