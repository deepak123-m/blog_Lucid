import noteContext from "../Context/Notecontext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

let uid = "";

const Explore = () => {
  const context = useContext(noteContext);
  const { alluser, getallUser, getUser, follow } = context;
  const [filteruser, setfilteruser] = useState([]);

  let [usermainid, setusermainid] = useState([]);

  const handleFollow = async (id, uid, e) => {
    e.preventDefault();
    const fol = await follow(id, uid);
    console.log("fol")
    console.log(fol)
    setusermainid(fol);

    alert("succesfully followed");
  };

  const render = (name, userName, id, image, following, followers) => {
    const status = usermainid.includes(id);

    if (uid === id || status) {
    } else {
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
          <div className="flex-row flex px-14 items-center pb-4 justify-between ">
            <div>
              <div className="flex gap-3  pt-4 pl-4 ">
                <img
                  alt="error"
                  className="w-12 h-12 inline rounded-full"
                  src={image}
                />

                <div>
                  <div key={id}>
                    <div className="font-bold text-black ">{name}</div>
                    <div className="text-gray-500">@{userName}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <button
                onClick={(e) => handleFollow(id, uid, e)}
                className="bg-gray-300  hover:scale-110 font-bold mr-4  py-1 px-4 text-black rounded-2xl"
              >
                Follow
              </button>
            </div>
          </div>{" "}
        </Link>
      );
    }
  };

  const callalluser = async () => {
    const users = await getallUser();
    setfilteruser(filteruser.concat(users));

    const mainid = await getUser();

    setusermainid(usermainid.concat(mainid.following));
    uid = mainid._id;
  };

  useEffect(() => {
    callalluser();
  }, []);
  return (
    <>
      <div className="  rounded-2xl md:mx-8 m-14 bg-white w-2/8">
        <div className="text-black">
          <div className="text-4xl font-bold text-blue-600 tracking-wider  flex justify-center items-center pt-4 pl-4 pb-2">
            Check Author's Profiles & Who to Follow...?
          </div>

          {alluser &&
            alluser.map(
              ({ name, userName, _id, image, following, followers }) => {
                
                return render(name, userName, _id, image, following, followers);
              }
            )}
        </div>
      </div>
    </>
  );
};

export default Explore;
