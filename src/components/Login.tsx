import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { handleLogin } from "../api/login.ts";
import { ROUTES } from "../routes.tsx";

import { useUserStore } from "../state/user.ts";

export type LoginState = "success" | "error" | "loading" | "stale";

export default function App() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const setUsername = useUserStore((state) => state.setUsername);
  const setIsLoggedIn = useUserStore((state) => state.setLoginState);
  const [loginState, setLoginState] = useState<LoginState>("stale");
  const navigate = useNavigate();

  const credentials = useRef<{
    username?: string;
    password?: string;
    remember?: boolean;
  }>();

  function handleChange(e: FormEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.currentTarget;

    credentials.current = {
      ...credentials.current,
      [name]: type === "checkbox" ? checked : value,
    };
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (credentials.current?.username && credentials.current?.password) {
      setLoginState("loading");

      handleLogin(
        credentials.current.username,
        credentials.current.password,
      ).then((result) => {
        if (result) {
          setLoginState("success");
          setIsLoggedIn(true);
          setUsername(result.data.username);
        } else {
          setLoginState("error");
          setIsLoggedIn(false);
        }
      });
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 1000);
    }
  }, [isLoggedIn, navigate]);

  return (
    <fieldset className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-full max-w-[360px] border border-gray-200 bg-white shadow border-1 p-10 rounded-lg">
        <legend className="text-2xl font-semibold mb-4">
          Hawkins Real Estate
          <br />
          <small className="text-gray-400">Employee Portal</small>
        </legend>
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              onChange={handleChange}
              type="checkbox"
              id="remember"
              name="remember"
              className="text-red-500"
            />
            <label htmlFor="remember" className="text-green-900 ml-2">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            disabled={loginState === "loading" || loginState === "success"}
            className="h-10 bg-blue-400 transition-all duration-300 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            {loginState === "loading" ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 animate-spin dark:text-blue-200 fill-white m-auto"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <span>Login</span>
            )}
          </button>
          {loginState === "error" && (
            <div className="px-4 py-2 mt-4 rounded-lg bg-red-100 text-red-500 border-red-200 border-1 border">
              Please try again!
            </div>
          )}

          {loginState === "success" && (
            <div className="px-4 py-2 mt-4 rounded-lg bg-green-100 text-green-500 border-green-200 border-1 border">
              Redirecting...
            </div>
          )}
        </form>
      </div>
    </fieldset>
  );
}
