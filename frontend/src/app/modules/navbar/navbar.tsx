import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Plus } from 'assets/icons/plus.svg';
import { ReactComponent as Headphones } from 'assets/icons/headphones.svg';
import "./navbar.scss";
import { Icon } from "app/components/icon/icon";
import { UserData } from "app/models/user.model";
import Profile from '../profile/profile';
import { SET_CREATE_ROOM_MODAL } from "app/store/system/systemActionTypes";

const Navbar = () => {
  const dispatch = useDispatch();
  const [ showProfile, toggleProfile ] = useState(false);

  const isLoggedIn = useSelector((state: any) => {
    return state.system.isLoggedIn;
  });

  const userData: UserData = useSelector((state: any) => {
    return state.user.user;
  });

  const handleProfile = () => {
    toggleProfile(!showProfile);
  }

  const handleOpenCreateRoom = () => {
    dispatch({type: SET_CREATE_ROOM_MODAL, payload: true})
  }

  return (
    <div className="container text-white">
      <div className="d-flex justify-content-between align-items-center py-3 nav-bar">
        <div className="logo-type h5 font-weight-title">vibey</div>
        {isLoggedIn ? (
          <div className="d-flex align-items-center">
            <div className="mr-4">
              <button className="btn btn-md btn-primary text-white font-weight-bold d-flex justify-content-center align-items-center" onClick={handleOpenCreateRoom}>
                <Icon Component={Plus} size={[1, 1]}></Icon>{" "}
                <span className="pl-2">Create Room</span>
              </button>
            </div>
            <div className="profile-wrapper">
               <img
                  onClick={handleProfile}
                  className="profile-picture"
                  src={userData.image}
                  alt="User Pic"
                />
              <div className={`profile`}>
                {/* <Modal 
                  show={showProfile} 
                  onHide={handleProfile}
                  size="sm"
                  animation={true}
                  backdrop="static"
                  dialogClassName="text-white rounded-lg"
                >
                  <Modal.Header className="bg-secondary border-0" closeButton>
                    <h5>Your Profile</h5>
                  </Modal.Header>
                  <Modal.Body className="bg-secondary w-100">
                    <Profile />
                  </Modal.Body>
                </Modal> */}
              </div>
            </div>
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
