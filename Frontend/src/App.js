import Content from "./Components/Content";
import Home from "./Components/Home";
import NoteState from "./Context/Notestate";
import Explore from "./Components/Explore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Createblog from "./Components/Createblog";
import Following from "./Components/Following";
import Followers from "./Components/Followers";

import Blogs from "./Components/Blogs";

function App() {
  return (
    <NoteState>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="bg-yellow-100">
                <div className=" overflow-auto  ">
                  <div className="w-full h-[58px]   lg:block md:border-gray-800  mb-4 bg-gray-200  border-r border-white  ">
                    <Home />
                  </div>
                  <Content />
                  <div className="w-full lg:block ">
                    {" "}
                    <Explore />
                  </div>
                </div>
              </div>
            }
          />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/following"
            element={
              <div className="h-[750px]  bg-yellow-100">
                <Following />
              </div>
            }
          />

          <Route
            exact
            path="/followers"
            element={
              <div className=" h-[750px] bg-yellow-100">
                <Followers />
              </div>
            }
          />

          <Route
            exact
            path="/profile"
            element={
              <div className="bg-yellow-100 ">
                <Profile />
              </div>
            }
          />
          <Route export path="/createblog" element={<Createblog />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
