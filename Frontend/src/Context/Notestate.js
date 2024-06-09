import NoteContext from "./Notecontext";

import { useState } from "react";

const Notestate = (props) => {
  const userInitial = [];
  const [user, setUser] = useState(userInitial);
  const host = "https://myblog-backend-7hyi.onrender.com";

  const [post, setPost] = useState([]);
  const [alluser, setalluser] = useState([]);
  const [commentAll,setComment] = useState([])

  const loginUser = async (email, password, hook) => {
    const response = await fetch(`${host}/blog/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, hook }),
    });
    const json = await response.json();
    console.log("hookresponse")
    console.log(json)
    return json;
  };

  const getUser = async () => {
    const response = await fetch(`${host}/blog/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const users = await response.json();

    if (users._id && user.length === 0) {
      setUser(user.concat(users));
    }
    return users;
  };

  const getallUser = async () => {
    setalluser(alluser.splice(0, alluser.length));
    const response = await fetch(`${host}/blog/getalluser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const users = await response.json();
    if (alluser.length !== 5) {
      console.log("contra")
      setalluser(alluser.concat(users));
    }

    return users;
  };

  const getPost = async () => {
    const response = await fetch(`${host}/blog/getpost`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    const json = await response.json();
    setPost(json);
    return json;
  };

  const addPost = async (
    image,
    description,
    userName,
    user,
    name,
    profileimage,
    title
  ) => {
    const response = await fetch(`${host}/blog/addpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        user,
        userName,
        description,
        name,
        profileimage,
        title,
      }),
    });

    const json = await response.json();
    setPost(post.concat(json));
  };

  const unfollow = async(mainid,nrmlid) => {
    const response = await fetch(`${host}/blog/unfollow`,{
      method:"PUT",
      headers:{
        "content-Type":"application/json",
      },
      body: JSON.stringify({mainid,nrmlid}),
    });
   await response.json();
   return getallUser();
  }

  const getComment = async () => {
   commentAll.splice(0);
    const response = await fetch(`${host}/blog/comments`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    const json = await response.json();
    setComment(commentAll.concat(json))
    return json;
  };


  const disconSlack = async(id) => {

    const response = await fetch(`${host}/blog/deletehook`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      id
      }),
    });

  }

    const addComment = async (
   name,
   postId,
   comments,
   userid,
   title,
    ) => {
      
      const response = await fetch(`${host}/blog/comment/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          postId,
          comments,
          userid,
          title
        }),
      });

     await response.json();
    
  };

  const deletePost = async (id) => {

    const response = await fetch(
      `${host}/blog/deletepost/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
   
    const newPost = post.filter((post) => {
      return post._id !== id;
    });
    setPost(newPost);
  };

  const updatePostLike = async (_id, user) => {
    const response = await fetch(
      `${host}/blog/updatepostlike/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      }
    );

     await response.json();

    const res = await getPost();
    setPost(res);
  };

  const follow = async (id, uid) => {
    const response = await fetch(
      `${host}/blog/follow/${uid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }

      
    );

    const fol = await response.json();
    getallUser();
    return fol;
   
  };

  const updatePostRetweet = async (_id, user) => {
    const response = await fetch(
      `${host}/blog/updatepostretweet/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      }
    );

     await response.json();

    const res = await getPost();
    setPost(res);
  };

  return (
    <NoteContext.Provider
      value={{
        user,
        getUser,
        post,
        addPost,
        getPost,
        updatePostLike,
        updatePostRetweet,
        loginUser,
        alluser,
        getallUser,
        follow,
        deletePost,
        addComment,
        commentAll,
        getComment,
        disconSlack,
        unfollow,

      }}
    >
      {props.children} {/*children components passing props*/}
    </NoteContext.Provider>
  );
};

export default Notestate;
