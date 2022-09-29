import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import profileSlice from '../../../featurns/authentication/utils/authSlice';
import Style from "./style.module.css"
import {UserOutlined,LogoutOutlined} from "@ant-design/icons"
function Header() {
  const history = useHistory();
  const userProfile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  const goToHome = () => {
    history.push("/")
  }
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token")
    dispatch(profileSlice.actions.setProfile(null))
    goToHome();
  }
  const rederUserInfo = () => {
    if (userProfile) {
      return (
        <>
          <a href='#'><UserOutlined  /> {userProfile.hoTen}</a>
          <a href="#" onClick={handleLogOut}><LogoutOutlined /> Log Out</a>
        </>
      )
    }
    return (
      <>
        <NavLink to="signin">Sign In</NavLink>
        <NavLink to="signup">Sign Up</NavLink>
      </>
    )
  }
  return (
    <nav className={Style.nav}>
      <div className={Style.nabar}>
        {rederUserInfo()}
      </div>
    </nav>
  )
}

export default Header