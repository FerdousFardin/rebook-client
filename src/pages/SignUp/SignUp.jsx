import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../hooks/useToken";

export default function SignUp() {
  const { signupUser, loading, setLoading, googleLogin } =
    useContext(AuthContext);
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
    "flex justify-center w-full px-6 py-3 text-white bg-primary rounded-md md:w-auto md:mx-2 focus:outline-none";
  const inActiveClass =
    "flex justify-center w-full px-6 py-3 mt-4 text-primary border border-primary rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-primary dark:text-primary/25 focus:outline-none";
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
        setLoading(false);
      });
  };
  const handleGoogle = () => {
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
      .finally(() => setLoading(false));
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80)",
          }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
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

              <div className="mt-3 md:flex md:items-center md:-mx-2">
                <button
                  onClick={() => setAccountType("buyer")}
                  className={
                    accountType === "buyer" ? activeClass : inActiveClass
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
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
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
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
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
                  className="flex  items-center w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
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
                    className="invisible h-0 w-0"
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
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
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
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
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
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-primary dark:focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
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
                  disabled={loading}
                  type="submit"
                  className={`flex items-center ${
                    !loading && "justify-between"
                  } gap-5 w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-md disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-primary focus:outline-none focus:ring focus:ring-primary-100/20 focus:ring-opacity-50`}
                >
                  {loading && (
                    <div className="grid-1 my-auto h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-black border"></div>
                  )}
                  <span>{loading ? "Signing Up..." : "Sign Up"}</span>

                  {!loading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 rtl:-scale-x-100"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </form>
            <div className="w-1/2 text-center my-5">
              <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                or login with Social Media
              </span>
            </div>
            <div className="w-1/2">
              <button
                disabled={loading}
                onClick={handleGoogle}
                className="flex w-full items-center justify-center mt-5 px-6 py-3 text-gray-600 transition-colors duration-300 transform bg-gray-100 border disabled:bg-gray-800 disabled:text-white disabled:cursor-not-allowed rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {loading && (
                  <div className="grid-1 my-auto h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border"></div>
                )}
                {!loading && (
                  <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
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

                <span className="mx-2">
                  {loading
                    ? "Signing in with Google..."
                    : "Sign in with Google"}
                </span>
              </button>
            </div>
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
    </section>
  );
}
