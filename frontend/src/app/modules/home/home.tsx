import React from "react";
import './home.scss';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "app/modules/navbar/navbar";
import { GET_API_START, GET_API_SUCCESS } from "app/store/system/systemActionTypes";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('v-token');
    history.push('/')
  }

  return (
    <div>
      <Navbar />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;