/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './profile.scss';
import { UserData } from "../../models/user.model";
import { onLogout } from "app/store/user/userActions";
import Icon from "app/components/icon/icon";
import {ReactComponent as Thumb} from 'assets/icons/thumb.svg';

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData: UserData = useSelector((state: any) => state.user.user);

  const handleLogout = () => {
    dispatch(onLogout(history));
  }

  return (
    <div className="text-white px-3 pb-3 rounded-lg shadow-sm">
      <div className="d-flex align-items-center">
        <img src={userData.image} className="pro" alt="profile" />
        <div className="pl-3">
          <p className="m-0"><b>{userData.display_name}</b></p>
          <p >{userData.email}</p>
          <div className="d-flex align-items-center">
            <Icon Component={Thumb} size={[1.2,1.2]} color="#4aaeae"></Icon>
            <span className="pl-2 font-weight-bold">{userData.likes.length}</span>
          </div>
        </div>
      </div>
      <div className="d-flex w-100 justify-content-center mt-4 pt-3">
        <button className="btn bg-warning text-white font-weight-bold" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Profile;
