import React, { use } from "react";
import { NavLink } from "react-router";
import "./Navbar.css";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { loading, userData, logOut } = use(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("LogOut Successful!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const list = (
    <ul className="flex gap-4 text-black/50">
      <NavLink to="/">
        <li>Home</li>
      </NavLink>
      <NavLink to="/private">
        <li>Private</li>
      </NavLink>
    </ul>
  );
  return (
    <div>
      <div className="w-full h-16 flex justify-between items-center px-5">
        <div className=""></div>
        <div className="">{list}</div>
        <div className={loading ? "invisible" : "block"}>
          {userData ? (
            <button
              onClick={handleLogOut}
              className="rounded-full border border-green-500 px-5 py-2 text-green-700 font-bold"
            >
              <h1>Log out</h1>
            </button>
          ) : (
            <button className="rounded-full px-5 py-2 text-green-700 font-bold bg-green-700/20">
              <NavLink to="/auth/login">
                <h1>Login</h1>
              </NavLink>
            </button>
          )}
        </div>
      </div>
      <div className="bg-black/10 h-px w-full"></div>
    </div>
  );
};

export default Navbar;
