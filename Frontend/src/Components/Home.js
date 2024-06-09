import React, { useContext, useEffect } from "react";

import { IoPerson } from "react-icons/io5";

import { CiCircleMore } from "react-icons/ci";
import noteContext from "../Context/Notecontext";
import { Link, useNavigate } from "react-router-dom";
import { IoCreateSharp } from "react-icons/io5";

let profileimage = "";
let uname = "";
let uusername = "";
let userid = "";
let following;
let followers;
let userHook;

const Home = () => {
  let navigate = useNavigate();

  if (localStorage.getItem("token") === null) {
    navigate("/login");
  }


  const context = useContext(noteContext);
  const { user, getUser } = context;

  const callUser = async () => {
    const userimag = await getUser();

    profileimage = userimag.image;
    uname = userimag.name;
    uusername = userimag.userName;
    followers = userimag.followers;
    following = userimag.following;
    userid = userimag._id;
    userHook = userimag.hook;

  };

  useEffect(() => {
    callUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const items = [
  
    {
      id: 1,
      name: "Create Blog",
      icon: <IoCreateSharp size="28px"/>,
      to: "/createblog",
    },
    {
      id: 10,
      name: "Profile",
      icon: <IoPerson size="28px" />,
      to: "/profile",
    },
    {
      id: 11,
      name: "Logout",
      icon: <CiCircleMore size="28px" />,
      to: "/login",
    },
  ];
  return (
    <div>
      <div className="   ">
        <div className=" flex  justify-center  ">
          {items.map(({ id, name, icon, to }) => (
            <div
              key={id}
              className="p-3 flex flex-row items-center cursor-pointer hover:scale-105 duration-300 rounded-2xl gap-2 text-xl   "
            >
              <div>{icon}</div>
              <Link
                to={to}
                state={{
                  img: profileimage,
                  id: userid,
                  nme: uname,
                  unme: uusername,
                  flw: following,
                  flwrs: followers,
                  yes: "yes",
                  hook:userHook,
                }}
              >
               <button>{name}</button>
              </Link>
            </div>
          ))}

          
        </div>
      </div>

    </div>
  );
};

export default Home;
