import { useNavigate } from "react-router-dom";
import { useUserStore } from "../state/user.ts";
import { useEffect } from "react";
import { ROUTES } from "../routes.tsx";

export default function Dashboard() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const username = useUserStore((state) => state.username);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 1000);
    }
  }, [navigate, isLoggedIn]);

  if (!isLoggedIn) {
    return <div>Not authorized</div>;
  }

  return <div>Hello, {username}</div>;
}
