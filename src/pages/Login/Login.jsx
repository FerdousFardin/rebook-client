import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../hooks/useToken";

export default function Login() {
  const [userEmail, setUserEmail] = useState({});
  const [loginErr, setLoginErr] = useState("");
  const { loginUser, loading, setLoading, googleLogin } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [token] = useToken(userEmail);
  if (token) {
    navigate(from, { replace: true });
    toast.success(`Signed in successfully.`);
  }
  const handleSignIn = (data, e) => {
    setUserEmail("");
    setLoginErr("");
    // console.log(data);
    const { email, password } = data;
    loginUser(email, password)
      .then((res) => {
        console.log(res.user);
        setUserEmail({ email });

        e.target.reset();
      })
      .catch((er) => {
        setLoginErr(er.code);
        toast.error("Sign in failed!");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleGoogle = () => {
    setLoading(true);
    googleLogin().then((res) => {
      const userInfo = {
        name: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
        role: ["buyer"],
      };
      axios
        .post(`https://rebook-server.vercel.app/users`, userInfo)
        .then((res) => {
          if (res.data.acknowledged) {
            toast.success(`Signed in successfully.`);
            setUserEmail({ email: userInfo.email });
          }
        })
        .catch((er) => {
          console.error(er);
          toast.error(`Can't sign in at this moment.`);
        })
        .then(() => {
          setLoading(false);
        });
    });
  };
  return (
    <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
      <div className="mx-auto h-full sm:w-max">
        <div className="m-auto  py-12 ">
          <div className="mt-12 rounded-3xl border bg-slate-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">
              Login to your account
            </h3>
            <div className="mt-12 flex flex-wrap  gap-6 ">
              <button
                disabled={loading}
                onClick={handleGoogle}
                className="w-full h-11 rounded-full border hover:bg-gray-200 border-gray-300/75 bg-white disabled:bg-gray-400 disabled:cursor-not-allowed px-6 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700 "
              >
                <div className="w-full mx-auto flex items-center justify-center space-x-4 ">
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
                  <span className="block w-max text-sm font-semibold tracking-wide text-black dark:text-white">
                    {loading && "Signing In"} With Google
                  </span>
                </div>
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleSignIn)}
              className="mt-10 space-y-8 dark:text-white"
            >
              <div>
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary-100 dark:before:bg-primary-100/50 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
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
                    className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                  />
                </div>
                {errors?.email && (
                  <p className="text-yellow-600 text-sm mt-2">
                    *{errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end">
                <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary-100 dark:before:bg-primary-100/50 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
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
                    className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                  />
                </div>
                {errors?.password && (
                  <p className="text-yellow-600 text-sm mt-2">
                    *{errors.password.message}
                  </p>
                )}
                {loginErr && (
                  <p className="text-yellow-600 text-sm mt-2">
                    *{loginErr.split("/")[1]}
                  </p>
                )}
                <button className="-mr-3 w-max p-3">
                  <span className="text-sm tracking-wide text-primary-100 dark:text-sky-400">
                    Forgot password ?
                  </span>
                </button>
              </div>

              <div>
                <button
                  disabled={loading}
                  className="w-full rounded-full bg-primary disabled:bg-red-800
                  disabled:cursor-not-allowed dark:bg-primary/25 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-primary-100 focus:bg-primary/70 active:bg-primary-100 cursor-pointer text-white"
                >
                  {loading ? (
                    "Signing In..."
                  ) : (
                    <input type="submit" value="Log In" />
                  )}
                </button>
                <Link to={"/signup"} className="-ml-3  w-max p-3">
                  <span className="text-sm tracking-wide text-primary dark:text-primary">
                    Create new account
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
