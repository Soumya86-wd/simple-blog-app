import React from "react";
import { useDispatch } from "react-redux";
import { authService } from "../../appwrite";
import { logout } from "../../store";
import logoutIcon from "../../assets/log-out.svg";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button className="inline-block px-6 py-2 hover:bg-blue-100 duration-200 rounded-full">
      Logout{" "}
      <img className="overflow-hidden" src={logoutIcon} alt="logout icon" />
    </button>
  );
}

export default LogoutBtn;
