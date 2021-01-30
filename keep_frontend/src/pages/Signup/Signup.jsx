import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const Signup = ({ isAuthenticated, register, error }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      register({ name, email, password });
    } catch (err) {
      console.log(err);
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div
      className="bg-no-repeat bg-cover h-screen"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1461773518188-b3e86f98242f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80)`,
      }}
    >
      <div className="container mx-10 flex justify-center items-center h-full">
        <div
          className=" bg-white w-6/12 shadow-lg rounded-lg bg-opacity-40 bg-clip-padding"
          style={{ backdropFilter: "blur(20px)" }}
        >
          {error ? (
            <div className="w-full  px-3 py-3 bg-red-500 text-base uppercase font-sans text-white">
              {error}
            </div>
          ) : null}
          <p className="ml-4 my-4 font-sans text-gray-500 font-bold text-lg">
            Register here:
          </p>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="px-10 pb-4">
              <label
                htmlFor="name"
                className="block text-gray-500 text-sm font-bold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => onChangeHandler(e)}
                required
                className="w-full shadow-md appearance-none border rounded-md py-2 mb-4 px-3 text-gray-700 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 focus:text-gray-700 focus:placeholder-yellow-300"
              />
            </div>
            <div className="px-10 pb-4">
              <label
                htmlFor="email"
                className="block text-gray-500 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => onChangeHandler(e)}
                required
                className="w-full shadow-md appearance-none border rounded-md py-2 mb-4 px-3 text-gray-700 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 focus:text-gray-700 focus:placeholder-yellow-300"
              />
              <label
                htmlFor="password"
                className="block text-gray-500 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => onChangeHandler(e)}
                className="w-full shadow-md appearance-none border rounded-md py-2 mb-4 px-3 text-gray-700 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 focus:text-gray-700 focus:placeholder-yellow-300"
              />
            </div>
            <button
              className="w-6/12 ml-40 mb-4 inline-block self-center py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-400 rounded-full shadow-md ripple hover:shadow-lg hover:bg-blue-500 focus:outline-none"
              type="submit"
            >
              Register
            </button>
          </form>
          <p className="font-sans text-md text-gray-700 px-4 py-4">
            Already have an account ?{" "}
            <Link
              to="/"
              className="font-sans text-blue-600 cursor-pointer underline"
            >
              Go to login page here !
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

export default connect(mapStateToProps, { register })(Signup);
