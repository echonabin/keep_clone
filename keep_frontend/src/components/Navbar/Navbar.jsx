import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import googlekeepHome from "../../assets/images/home_keepIcon.png";
import user from "../../assets/images/user.png";

const Navbar = ({ logout }) => {
  const [userClicked, setUserClicked] = useState(false);
  return (
    <div className="px-10 py-3 border-b-2 border-gray-200">
      <div className="flex flex-row space-x-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#0000008a"
          className="h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <img src={googlekeepHome} alt="google keep icon png" />
        <Link
          to="/"
          className="font-sans font-light text-gray-500 text-3xl hover:underline"
        >
          Keep
        </Link>
        <input
          type="text"
          className="inline-block w-6/12 appearance-none border rounded-md py-3 px-3 mb-2 text-gray-400 focus:outline-none focus:bg-white focus:shadow-md focus:text-gray-700 focus:placeholder-gray-700 bg-gray-100"
          style={{ marginLeft: "5rem" }}
          placeholder="Search"
        />
        <div className=" rounded-full transform translate-x-80">
          <div className="relative bg-white rounded-full">
            <img
              src={user}
              alt="person logo"
              className="h-10"
              onClick={() => setUserClicked(!userClicked)}
            />
            {/* Dropdown body */}
            {userClicked ? (
              <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
                <div
                  className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-yellow-400 hover:text-white cursor-pointer"
                  onClick={() => logout()}
                >
                  Logout
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { logout })(Navbar);
