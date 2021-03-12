import React from 'react';
import './navbar.scss';
import { Icon } from '../icon/icon';

const Navbar = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center py-3">
        <div className="logo-type h5 font-weight-title">vibey</div>
        <div className="d-flex nav-items align-items-center">
          <div className="label">About Us</div>
          <div className="label">Contact</div>
          <div>
            <button className="btn btn-primary text-white font-weight-bold d-flex justify-content-center align-items-center">
              <Icon icon="headphones"></Icon> <span className="pl-2">Start listening</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
