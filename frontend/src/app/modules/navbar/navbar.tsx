import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.scss";
import { Icon } from "app/components/icon/icon";
import { UserData } from "app/models/user.model";
import { Dropdown, Menu } from 'antd';
import { useHistory } from "react-router-dom";
import { onLogout } from "app/store/user/userActions";


const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoggedIn = useSelector((state: any) => {
    return state.systemsystemState.isLoggedIn;
  });

  const userData: UserData = useSelector((state: any) => {
    return state.user.user;
  });

  const handleLogout = () => {
    dispatch(onLogout(history));
  }

  const menu = (
    <Menu>
      <Menu.Item className="px-4" onClick={handleLogout}>
        <div>Hello</div>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="container text-white">
      
      <div className="d-flex justify-content-between align-items-center py-3">
        <div className="logo-type h5 font-weight-title">vibey</div>
        {isLoggedIn ? (
          <div className="d-flex align-items-center">
            <div className="mr-4">
              <button className="btn btn-md btn-primary text-white font-weight-bold d-flex justify-content-center align-items-center">
                <Icon icon="plus" size={[1, 1]}></Icon>{" "}
                <span className="pl-2">Create Room</span>
              </button>
            </div>
            <div>
               <img
                  className="profile-picture"
                  src={userData.image}
                  alt="User Pic"
                />
              <div></div>
            {/* <Dropdown overlay={menu} placement="bottomLeft" arrow>
               
            </Dropdown> */}
            </div>
          </div>
        ) : (
          <div className="d-flex nav-items align-items-center">
            <div className="label">About Us</div>
            <div className="label">Contact</div>
            <div>
              <button className="btn btn-primary text-white font-weight-bold d-flex justify-content-center align-items-center">
                <Icon icon="headphones"></Icon>{" "}
                <span className="pl-2">Start listening</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
