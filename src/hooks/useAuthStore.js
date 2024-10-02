import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMsg, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // startLogin

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMsg());
      }, 10);
    }
  };

  // startRegister

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin(data.user));
    } catch (error) {
      console.log(error);
      dispatch(onLogout(error.response.data?.message || "--"));
      setTimeout(() => {
        dispatch(clearErrorMsg());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin(data.user));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };
  return {
    //* Properties
    errorMessage,
    status,
    user,

    //* Methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
