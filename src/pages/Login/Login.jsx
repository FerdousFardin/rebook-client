import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../hooks/useToken";
import SelectType from "./SelectType";
import { motion } from "framer-motion";

const loginAs = [{ name: "buyer" }, { name: "seller" }];
export default function Login() {
  const [selected, setSelected] = useState(loginAs[0]);
  const [sendToken, setSendToken] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const {
    loginUser,
    loadingReducer,
    dispatch,
    loadingState,
    googleLogin,
    logoutUser,
  } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [token] = useToken({ email: sendToken });
  if (token) {
    navigate(from, { replace: true });
    toast.success(`Logged in with Google`);
  }
  const handleSignIn = (data, e) => {
    setSendToken("");
    setLoginErr("");
    const { email, password } = data;
    loginUser(email, password)
      .then(() => {
        fetch(`${import.meta.env.VITE_API_URL}/user-authenticate`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email, accountType: selected.name }),
        })
          .then((r) => r.json())
          .then((dataUser) => {
            if (dataUser) {
              e.target.reset();
              toast.success(`Signed in successfully.`);
              setSendToken(email);
            } else {
              setLoginErr(
                `Account does not have ${selected.name} privileges. Please select correct account type or create a new one.`
              );
              logoutUser();
            }
          });
      })
      .catch((er) => {
        setLoginErr(er.code);
        toast.error("Sign in failed!");
      })
      .finally(() => {
        dispatch({ type: "LOGIN_OFF" });
      });
  };
  const handleGoogle = () => {
    setSendToken("");
    googleLogin().then((res) => {
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
            setSendToken(userInfo.email);
          }
        })
        .catch((er) => {
          console.error(er);
          toast.error(`Can't connect to Google at this moment.`);
        })
        .then(() => {
          dispatch({ type: "GOOGLE_OFF" });
        });
    });
  };
  return (
    <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
      <div className="mx-auto h-full sm:w-max">
        <div className="m-auto w-full max-w-lg py-12">
          <h3 className="text-2xl md:text-3xl text-gray-700 dark:text-white">
            Login to your account
          </h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.65 }}
            className="mt-12 sm:min-w-[50vw] lg:min-w-[30vw] rounded-3xl border bg-slate-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10"
          >
            <div className="flex gap-5 items-center justify-between">
              <span className="text-gray-500 text-xl">Login as</span>
              <SelectType {...{ selected, setSelected, loginAs }} />
            </div>
            <div className="mt-12 flex flex-wrap gap-4 w-auto justify-center">
              <button
                disabled={loadingState.googleLoading}
                onClick={handleGoogle}
                className="w-auto h-10 bg-transparent sm:mx-0 text-sm font-medium flex items-center justify-center px-4 duration-300  text-black border border-black inset-0 rounded-full hover:shadow-[0px_3px_0px_0px_#231b15] hover:-translate-y-1 active:translate-y-0 active:shadow-[0px_2px_0px_0px_#231b15] "
              >
                <div className="w-full mx-auto flex items-center justify-center space-x-2">
                  {loadingState.googleLoading || (
                    <svg className="w-5 h-5 " viewBox="0 0 40 40">
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
                  )}
                  {loadingState.googleLoading && (
                    <div className="grid-1 my-auto h-5 w-5 mr-3 border-t-transparent border-solid animate-spin rounded-full border-white border"></div>
                  )}
                  <span className="block w-max text-sm tracking-wide text-black dark:text-white">
                    {loadingState.googleLoading && "Signing In"} With Google
                  </span>
                </div>
              </button>
            </div>
            <div className="flex w-full justify-center my-5">
              <span className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">
                or login with email
              </span>
            </div>

            <form
              onSubmit={handleSubmit(handleSignIn)}
              className="mt-10 space-y-8 dark:text-white"
            >
              <div>
                <div className="w-full focus-within:invalid:before:bg-red-400">
                  <input
                    {...register("email", {
                      required: "User must provide an email.",
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Email is not valid.",
                      },
                    })}
                    id="email"
                    type="email"
                    placeholder="Your email or user name"
                    className="w-full bg-transparent py-3 pl-3 border border-gray-300 dark:placeholder-gray-300 duration-300 rounded focus:border-primary dark:border-gray-600 outline-none  invalid:border-warning"
                  />
                </div>
                {errors?.email && (
                  <p className="text-yellow-600 text-sm mt-2">
                    *{errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end">
                <div className="w-full focus-within:invalid:before:bg-red-400">
                  <input
                    {...register("password", {
                      required: "User must provide a password.",
                      minLength: {
                        value: 6,
                        message: "Password should be at-least 6 characters.",
                      },
                    })}
                    id="password"
                    type="password"
                    placeholder="Your Password"
                    className="w-full bg-transparent py-3 pl-3 border border-gray-300 dark:placeholder-gray-300 duration-300 rounded focus:border-primary dark:border-gray-600 outline-none  invalid:border-red-400"
                  />
                </div>
                {errors?.password && (
                  <p className="text-yellow-600 text-sm mt-2">
                    *{errors.password.message}
                  </p>
                )}
                {loginErr && (
                  <p className="text-yellow-600 text-sm mt-2 break-words">
                    *{loginErr}
                  </p>
                )}
                <button className="-mr-3 w-max p-3">
                  <span className="text-sm tracking-wide text-primary-100 dark:text-sky-400">
                    Forgot password ?
                  </span>
                </button>
              </div>

              <div className="flex items-center flex-col">
                <button
                  disabled={loadingState.emailLoading}
                  className="w-auto h-10 bg-primary mx-auto sm:mx-0 text-sm font-medium flex items-center justify-center px-8 duration-300  text-black border border-black inset-0 rounded-full hover:shadow-[0px_3px_0px_0px_#231b15] hover:-translate-y-1 active:translate-y-0 active:shadow-[0px_2px_0px_0px_#231b15] "
                >
                  {loadingState.emailLoading && (
                    <div className="grid-1 my-auto h-5 w-5 mr-3 border-t-transparent border-solid animate-spin rounded-full border-white border"></div>
                  )}
                  {loadingState.emailLoading ? (
                    "Signing In..."
                  ) : (
                    <input type="submit" value="Log In" />
                  )}
                </button>
                <Link to={"/signup"} className="-ml-3  w-max p-3 self-start">
                  <span className="text-sm tracking-wide text-primary dark:text-primary">
                    Create new account
                  </span>
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
{
  /*
<div class="w-full flex flex-wrap">

        <!-- Login Section -->
        <div class="w-full md:w-1/2 flex flex-col">

            <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                <a href="#" class="bg-black text-white font-bold text-xl p-4">Logo</a>
            </div>

            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">Welcome.</p>
                <form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
                    <div class="flex flex-col pt-4">
                        <label for="email" class="text-lg">Email</label>
                        <input type="email" id="email" placeholder="your@email.com" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
    
                    <div class="flex flex-col pt-4">
                        <label for="password" class="text-lg">Password</label>
                        <input type="password" id="password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
    
                    <input type="submit" value="Log In" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                </form>
                <div class="text-center pt-12 pb-12">
                    <p>Don't have an account? <a href="register.html" class="underline font-semibold">Register here.</a></p>
                </div>
            </div>

        </div>

        <!-- Image Section -->
        <div class="w-1/2 shadow-2xl">
            <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0">
        </div>
    </div>
*/
}
