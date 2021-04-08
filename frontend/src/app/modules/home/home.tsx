import React from "react";
import './home.scss';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "app/modules/navbar/navbar";

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
    </div>
  );
}

export default Home;