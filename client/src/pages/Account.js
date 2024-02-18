import React, { useEffect } from "react";
import { NavBar } from "../components/Nav/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../stores/userSlice";
import { useNavigate } from "react-router-dom";
import "./../styles/account.css"

export const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // user is not logged in navigate to login
  useEffect(() => {
    if (!user) navigate("/");
  }, []);

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }
 
  // @TODO allow users to edit profile (need mongo for this)
  return (
    <div>
      <NavBar />
      <div className="account-container">
        {user && (
          <>
            <h2>{`Email: ${user.email}`}</h2>
            <input 
              type="button"
              value="Logout"
              className="btn-logout"
              onClick={handleLogout}
            />
          </>
        )}
      </div>
      
    </div>
  )
}