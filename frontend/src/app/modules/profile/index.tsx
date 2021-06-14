/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Profile.scss';
import { UserData } from '../../models/user.model';
import { onLogout } from 'app/store/user/userActions';
import Icon from 'app/components/Icon';
import { ReactComponent as Thumb } from 'assets/icons/thumb.svg';
import { HiMail, HiUser } from 'react-icons/hi';

const Profile = () => {
 const dispatch = useDispatch();
 const history = useHistory();
 const userData: UserData = useSelector((state: any) => state.user.user);

 const handleLogout = () => {
  dispatch(onLogout(history));
 };

 return (
  <div className="text-white px-2 pb-3 rounded-lg shadow-sm">
   <div className="d-flex align-items-center">
    <div>
     <div className="d-flex align-items-center pt-3">
      <Icon Component={HiUser} size={[1.5, 1.5]}></Icon>
      <p className="m-0 pl-2">
       <b>{userData.display_name}</b>
      </p>
     </div>

     <div className="d-flex align-items-center pt-3">
      <Icon Component={HiMail} size={[1.5, 1.5]}></Icon>
      <p className="m-0 pl-2">
       <b>{userData.email}</b>
      </p>
     </div>

     <div className="d-flex align-items-center pt-3">
      <Icon Component={Thumb} size={[1.2, 1.2]} color="#4aaeae"></Icon>
      <span className="pl-2 font-weight-bold">{userData.likes.length}</span>
     </div>
    </div>
   </div>
   <div className="d-flex w-100 justify-content-center mt-4 pt-3">
    <button
     className="btn bg-warning text-white font-weight-bold"
     onClick={handleLogout}
    >
     Logout
    </button>
   </div>
  </div>
 );
};

export default Profile;
