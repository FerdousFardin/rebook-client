import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PrimaryBtn from "../../components/Buttons/PrimaryBtn";
import { AuthContext } from "../../context/AuthProvider";

export default function Login() {
  const { loginUser, loading, setLoading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSignIn = (data, e) => {
    // console.log(data);
    const { email, password } = data;
    loginUser(email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((er) => {
        console.error(er);
        setLoading(false);
      });
  };
  return (
    <div class="m-auto xl:container px-12 sm:px-0 mx-auto">
      <div class="mx-auto h-full sm:w-max">
        <div class="m-auto  py-12">
          <div class="space-y-4">
            <a href="">
              <img
                src="images/tailus.svg"
                class="w-40 dark:hidden"
                alt="tailus logo"
              />
              <img
                src="images/logo.svg"
                class="w-40 hidden dark:block"
                alt="tailus logo"
              />
            </a>
          </div>
          <div class="mt-12 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
            <h3 class="text-2xl font-semibold text-gray-700 dark:text-white">
              Login to your account
            </h3>
            <div class="mt-12 flex flex-wrap  gap-6 ">
              <button class="w-full h-11 rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700">
                <div class="w-full mx-auto flex items-center justify-center space-x-4">
                  <img
                    src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                    class="w-5"
                    alt=""
                  />
                  <span class="block w-max text-sm font-semibold tracking-wide text-black dark:text-white">
                    With Google
                  </span>
                </div>
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleSignIn)}
              class="mt-10 space-y-8 dark:text-white"
            >
              <div>
                <div class="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary-100 dark:before:bg-primary-100/50 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    {...register("email", {
                      required: "User must provide an email.",
                    })}
                    id="email"
                    type="email"
                    placeholder="Your email or user name"
                    class="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                  />
                </div>
              </div>

              <div class="flex flex-col items-end">
                <div class="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary-100 dark:before:bg-primary-100/50 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    {...register("password", {
                      required: "User must provide a password.",
                    })}
                    id="password"
                    type="password"
                    placeholder="Your Password"
                    class="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                  />
                </div>
                <button class="-mr-3 w-max p-3">
                  <span class="text-sm tracking-wide text-primary-100 dark:text-sky-400">
                    Forgot password ?
                  </span>
                </button>
              </div>

              <div>
                <button
                  disabled={loading}
                  className="w-full rounded-full bg-primary dark:bg-primary/25 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-primary-100 focus:bg-primary/70 active:bg-primary-100 cursor-pointer text-white"
                >
                  {loading ? (
                    "Signing In..."
                  ) : (
                    <input type="submit" value="Log In" />
                  )}
                </button>
                <Link to={"/signup"} class="-ml-3  w-max p-3">
                  <span class="text-sm tracking-wide text-primary dark:text-primary">
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
