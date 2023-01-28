import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../hooks/useToken";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function SignUp() {
  const {
    signupUser,
    loadingReducer,
    loadingState,
    dispatch,
    googleLogin,
    updateInfo,
  } = useContext(AuthContext);
  const [signUpErrors, setSignUpErrors] = useState("");
  const [sendToken, setSendToken] = useState("");
  const [token] = useToken({ email: sendToken });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [accountType, setAccountType] = useState("buyer");
  const activeClass =
    "flex flex-row-reverse justify-center px-6 py-3 text-white bg-primary capitalize rounded-full w-auto md:mx-2 focus:outline-none";
  const inActiveClass =
    "flex flex-row-reverse justify-center w-auto px-6 py-3 text-primary capitalize md:mt-0 md:mx-2 dark:border-primary dark:text-primary/25 focus:outline-none";
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  if (token) navigate(from, { replace: true });
  const handleSignup = (data, e) => {
    setSendToken("");
    setSignUpErrors("");
    const { password, confirmPassword, email } = data;
    const formData = new FormData();
    formData.append("image", data.image[0]);
    if (password !== confirmPassword) {
      setSignUpErrors("Password doesn't match.");
      return;
    }

    signupUser(email, password)
      .then((res) => {
        fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_imbb_apikey
          }`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((res) => res.json())
          .then(({ data: { url } }) => {
            if (url) {
              const userInfo = {
                photoURL: url,
                email,
                name: `${data.firstName} ${data.lastName}`,
                role: [accountType],
              };
              axios
                .post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
                .then((res) => {
                  if (res.data.acknowledged) {
                    updateInfo();
                    setSendToken(email);
                    e.target.reset();
                  }
                });
            }
          });
      })
      .catch((er) => {
        setSignUpErrors(er.code);
      })
      .finally(() => {
        dispatch({ type: "REGISTER_OFF" });
      });
  };
  const handleGoogle = (e) => {
    e.preventDefault();
    setSendToken("");
    googleLogin()
      .then((res) => {
        if (res.user) {
          const userInfo = {
            name: res.user.displayName,
            email: res.user.email,
            photoURL: res.user.photoURL,
            role: ["buyer"],
          };
          axios
            .post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
            .then((res) => {
              if (res.data.acknowledged) {
                toast.success("Signed in successfully.");
                setSendToken(userInfo.email);
              }
            })
            .catch((er) => {
              console.error(er);
              toast.error("Couldn't Register your account");
            });
        }
      })
      .catch((er) => {
        console.error(er);
      })
      .finally(() => dispatch({ type: "GOOGLE_OFF" }));
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0, transitionDuration: 0.65 }}
      transition={{ duration: 0.65 }}
      className="bg-white dark:bg-gray-900 after:content-[''] after:w-full lg:after:w-0 after:h-2 after:absolute after:top-0 after:bg-primary after:left-0 "
    >
      <div className="flex justify-center min-h-screen flex-row-reverse">
        <div className="hidden lg:block lg:w-4/5 h-screen">
          <img
            className="w-full h-screen object-cover"
            src="https://i.postimg.cc/y7cXkQ3c/red-book.jpg"
            alt="red book"
          />
        </div>

        <div className="flex items-center relative w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 before:content-[''] before:w-2 lg:before:h-full before:bg-primary before:absolute md:before:left-0">
          <div className="w-full">
            <Link
              to={location.pathname === "/" ? "/#header" : "/"}
              className="absolute left-5 top-3 lg:top-0 text-xl font-bold text-gray-800 transition-colors duration-300 transform dark:text-white lg:text-2xl hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-2"
            >
              <img
                className="w-5 h-5 lg:w-6 lg:h-6"
                src="../../../public/favicon.ico"
                alt=""
              />
              <span>
                Your<span className="text-primary">Shelf</span>
              </span>
            </Link>
            <h1 className="text-3xl mt-5 lg:mt-0 tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            <div className="mt-6">
              <h1 className="text-gray-500 dark:text-gray-300">
                Select type of account
              </h1>

              <div className="mt-3 flex items-center md:-mx-2 text-center">
                <button
                  onClick={() => setAccountType("buyer")}
                  className={
                    accountType === "buyer" ? activeClass : inActiveClass
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="mx-2">buyer</span>
                </button>

                <button
                  onClick={() => setAccountType("seller")}
                  className={
                    accountType === "seller" ? activeClass : inActiveClass
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>

                  <span className="mx-2">seller</span>
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handleSignup)}
              className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
            >
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  First Name
                </label>
                <input
                  {...register("firstName", {
                    required: "User must provide First Name",
                  })}
                  type="text"
                  placeholder="John"
                  className="w-full bg-transparent py-3 pl-3 border border-gray-300 dark:placeholder-gray-300 duration-300 rounded focus:border-primary dark:border-gray-600 outline-none invalid:border-warning"
                />
                {errors.firstName && (
                  <p className="text-sm text-yellow-600 mt-2">
                    *{errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Last name
                </label>
                <input
                  {...register("lastName", {
                    required: "User must provide Last Name",
                  })}
                  type="text"
                  placeholder="Snow"
                  className="w-full bg-transparent py-3 pl-3 border border-gray-300 dark:placeholder-gray-300 duration-300 rounded focus:border-primary dark:border-gray-600 outline-none  invalid:border-warning"
                />
                {errors.lastName && (
                  <p className="text-sm text-yellow-600 mt-2">
                    *{errors.lastName.message}
                  </p>
                )}
              </div>

              <div>
                <p className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Upload Profile Picture
                </p>
                <label
                  htmlFor="dropzone-file"
                  className="flex  items-center w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 group-focus:border-primary focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>

                  <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                  <input
                    {...register("image", {
                      required: "User must provide a picture",
                    })}
                    id="dropzone-file"
                    type="file"
                    className="invisible h-0 w-0 group"
                  />
                </label>
                {errors.image && (
                  <p className="text-sm text-yellow-600 mt-2">
                    *{errors.image.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email address
                </label>
                <input
                  {...register("email", {
                    required: "User must provide an email",
                  })}
                  type="email"
                  placeholder="johnsnow@example.com"
                  className="w-full bg-transparent py-3 pl-3 border border-gray-300 dark:placeholder-gray-300 duration-300 rounded focus:border-primary dark:border-gray-600 outline-none  invalid:border-warning"
                />
                {errors.email && (
                  <p className="text-sm text-yellow-600 mt-2">
                    *{errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "User must provide a password",
                  })}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-transparent py-3 pl-3 border border-gray-300 dark:placeholder-gray-300 duration-300 rounded focus:border-primary dark:border-gray-600 outline-none  invalid:border-warning"
                />
                {errors.password && (
                  <p className="text-sm text-yellow-600 mt-2">
                    *{errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Confirm password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "User must confirm his password",
                  })}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-transparent py-3 pl-3 border border-gray-300 dark:placeholder-gray-300 duration-300 rounded focus:border-primary dark:border-gray-600 outline-none  invalid:border-warning"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-yellow-600 mt-2">
                    *{errors.confirmPassword.message}
                  </p>
                )}
                {signUpErrors && (
                  <p className="text-sm text-yellow-600 mt-2">
                    *{signUpErrors}
                  </p>
                )}
              </div>

              <div>
                <button
                  disabled={loadingState.registerLoading}
                  type="submit"
                  className={`flex items-center ${
                    !loadingState.registerLoading && "justify-between"
                  } hover:translate-x-1 inline-flex gap-2 justify-between items-center duration-300  hover:text-white group hover:bg-primary rounded-full pl-4 ease-linear disabled:pointer-events-none disabled:bg-primary/60 focus:outline-none  focus:shadow-primary-100 focus:shadow-[0px_0px_2px]`}
                >
                  {loadingState.registerLoading && (
                    <div className="grid-1 my-auto h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-black border"></div>
                  )}
                  <span>
                    {loadingState.registerLoading ? "Signing Up..." : "Sign Up"}
                  </span>

                  <span
                    className={`p-2   rounded-full ${
                      loadingState.registerLoading
                        ? "text-black"
                        : "bg-primary text-white group-hover:bg-transparent"
                    } `}
                  >
                    <ArrowRightIcon className="w-5 h-5 " />
                  </span>
                </button>
              </div>
              <div className="">
                <button
                  disabled={loadingState.googleLoading}
                  onClick={handleGoogle}
                  className="hover:translate-x-1 inline-flex flex-row-reverse gap-2 justify-between items-center duration-300 hover:text-white group hover:bg-black rounded-full pl-4 ease-linear disabled:pointer-events-none disabled:bg-black/60 focus:outline-none  focus:shadow-primary-100 focus:shadow-[0px_0px_2px] h-10"
                >
                  {loadingState.googleLoading && (
                    <div className="grid-1 mr-3 my-auto h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-black border"></div>
                  )}
                  {!loadingState.googleLoading && (
                    <span className="bg-black p-2 rounded-full">
                      <svg className="w-6 h-6" viewBox="0 0 40 40">
                        <path
                          d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                          fill="#FFC107"
                        />
                        <path
                          d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                          fill="#FF3D00"
                        />
                        <path
                          d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                          fill="#4CAF50"
                        />
                        <path
                          d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                          fill="#1976D2"
                        />
                      </svg>
                    </span>
                  )}

                  <span className="mx-2">
                    {loadingState.googleLoading
                      ? "Signing in with Google..."
                      : "Sign in with Google"}
                  </span>
                </button>
              </div>
            </form>
            {/* <div className="md:w-1/2 text-center my-5">
              <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                or login with Social Media
              </span>
            </div> */}

            <div className="w-1/2 text-gray-700 mt-5">
              Already have an account?{" "}
              <Link to={"/login"} className="-ml-3 w-max p-3">
                <span className="text-sm tracking-wide text-primary dark:text-primary">
                  Sign In here
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
