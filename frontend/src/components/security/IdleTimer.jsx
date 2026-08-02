import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";

const IDLE_TIME = 60 * 60 * 1000; // 1 hora

export default function IdleTimer() {

  const timer = useRef(null);

  const navigate = useNavigate();

  const { logout } = useAuth();

  const resetTimer = () => {

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {

      toast.error("Tu sesión expiró por inactividad.");

      logout();

      navigate("/login");

    }, IDLE_TIME);

  };

  useEffect(() => {

    const events = [
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
      "touchstart"
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {

      clearTimeout(timer.current);

      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );

    };

  }, []);

  return null;

}