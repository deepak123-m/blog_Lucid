import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import noteContext from "../Context/Notecontext";

const Following = () => {
  let navigate = useNavigate();
  const[all,setall] = useState("")

  if (localStorage.getItem("token") === null) {
    navigate("/login");
  }
  let context = useContext(noteContext);
  const { alluser,unfollow } = context;
  const location = useLocation();



  const handleUnfollow = async(mainid,nrmlid,e) => {
    e.preventDefault();

   const user_all=  await unfollow(mainid,nrmlid);
    setall(".");
    alert("successfully Unfollowed")

  }
  console.log(alluser)

  const render = (name, userName, id, image, following, followers,index,main_user_id) => {
    
    if (!location.state.following.includes(id) ) {
   
    } else {
      console.log(location.state.id)
      console.log(name)
      console.log(alluser[index].followers)
   
    if(alluser[index].followers.includes(main_user_id))
      {
       
      return (
        <Link
          to="/profile"
          state={{
            img: image,
            nme: name,
            unme: userName,
            flw: following,
            flwrs: followers,
            id: id,
            yes: "no",
          }}
        >
          <div className="flex-row flex m-3 items-center justify-between  mr-6 ">
            <div>
              <div className="flex gap-3  pt-4 pl-4 ">
                <img
                  alt="error"
                  className="w-12 h-12 inline rounded-full"
                  src={image}
                />

                <div>
                  <div key={id}>
                    <div className="font-bold ">{name}</div>
                    <div className="text-gray-500">@{userName}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5"></div>

            <button
                onClick={(e) => handleUnfollow(location.state.id,id,e)}
                className="bg-gray-300  hover:scale-110 font-bold mr-4  py-1 px-4 text-black rounded-2xl"
              >
                Unfollow{all}
              </button>
          </div>{" "}
        </Link>
      );
    }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className=" bg-white  w-[50%] m-12 rounded-2xl mx-8  border-gray-800 border ">
        <div className="">
          <div className="text-xl font-bold pt-4 pl-4 pb-2">Following</div>

          {alluser &&
            alluser.map(
              ({ name, userName, _id, image, following, followers },index) => {
                let userid = _id;
                return render(
                  name,
                  userName,
                  userid,
                  image,
                  following,
                  followers,
                  index,
                  location.state.id,
                );
              }
            )}
        </div>
      </div>
    </div>
  );
};

export default Following;
