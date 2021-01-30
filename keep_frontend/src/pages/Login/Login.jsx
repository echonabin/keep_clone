import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import googlekeep from "../../assets/images/googlekeep.png";

const Login = ({ isAuthenticated, login, error }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  const onChange = (e) =>
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="bg-blue-50">
      <div className="container mx-10 h-screen">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex flex-col items-center w-80 bg-white shadow-xl rounded-lg transition hover:shadow-2xl focus:shadow-2xl">
            {error ? (
              <div className="w-full  px-3 py-3 bg-red-500 text-base uppercase font-sans text-white">
                {error}
              </div>
            ) : null}
            <img src={googlekeep} alt="google keep icon" className="h-14 m-5" />
            <p className="font-sans text-base text-gray-500">Welcome back!</p>
            <form
              className="mt-4 flex flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                login({ email, password });
              }}
            >
              <label
                className="block text-gray-500 ml-2 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => onChange(e)}
                className="w-full shadow-md appearance-none border rounded-md py-2 mb-4 px-3 text-gray-700 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 focus:text-gray-700 focus:placeholder-yellow-300"
                placeholder="Email"
                required
              />
              <label
                htmlFor="password"
                className="block text-gray-500 ml-2 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => onChange(e)}
                required
                className="w-full shadow-md appearance-none border rounded-md py-2 px-3 mb-4 text-gray-700 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 focus:text-gray-700 focus:placeholder-yellow-300"
              />
              <button
                className="w-6/12 inline-block self-center py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-yellow-500 rounded-full shadow-md ripple hover:shadow-lg hover:bg-yellow-600 focus:outline-none"
                type="submit"
              >
                Login
              </button>
            </form>
            <p className="font-sans text-md text-gray-700 px-4 py-4">
              Dosen't have an account ?{" "}
              <Link
                to="/register"
                className="font-sans text-yellow-600 cursor-pointer underline"
              >
                Create one here!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

export default connect(mapStateToProps, { login })(Login);
