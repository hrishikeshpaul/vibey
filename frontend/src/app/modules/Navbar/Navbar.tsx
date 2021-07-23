import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Plus } from "assets/icons/plus.svg";
import { ReactComponent as Headphones } from "assets/icons/headphones.svg";
import "./Navbar.scss";
import { Icon } from "app/components/Icon/Icon";
import { UserData } from "app/models/user.model";
import Profile from "../Profile/Profile";
import { SET_CREATE_ROOM_MODAL } from "app/store/system/systemActionTypes";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Avatar,
} from "@chakra-ui/react";

const Navbar = () => {
  const dispatch = useDispatch();
  
  const isLoggedIn = useSelector((state: any) => {
    return state.system.isLoggedIn;
  });

  const userData: UserData = useSelector((state: any) => {
    return state.user.user;
  });

  const handleOpenCreateRoom = () => {
    dispatch({ type: SET_CREATE_ROOM_MODAL, payload: true });
  };

  return (
    <div className="container text-white">
      <div className="d-flex justify-content-between align-items-center py-3 nav-bar">
        <div className="logo-type h5 font-weight-title">vibey</div>
        {isLoggedIn ? (
          <div className="d-flex align-items-center">
            <div className="mr-4">
              <button
                className="btn btn-md btn-primary text-white font-weight-bold d-flex justify-content-center align-items-center"
                onClick={handleOpenCreateRoom}
              >
                <Icon Component={Plus} size={[1, 1]}></Icon>{" "}
                <span className="pl-2">Create Room</span>
              </button>
            </div>
            <Popover>
              <PopoverTrigger>
                <div className="profile-wrapper avatar">
                  <Avatar name={userData.display_name} src={userData.image} />
                </div>
              </PopoverTrigger>
              <PopoverContent className="bg-secondary border-0">
                <PopoverArrow />
                <PopoverHeader className="px-3 py-3 d-flex justify-content-between align-items-center border-light">
                  <span className="h5 m-0">Your Profile</span>
                </PopoverHeader>
                <PopoverBody>
                 <Profile></Profile>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="d-flex nav-items align-items-center">
            <div className="label">About Us</div>
            <div className="label">Contact</div>
            <div>
              <button className="btn btn-primary text-white font-weight-bold d-flex justify-content-center align-items-center">
                <Icon Component={Headphones}></Icon>{" "}
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
