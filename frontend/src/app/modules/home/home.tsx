import React from "react";
import './home.scss';
import { useHistory } from "react-router-dom";
import Navbar from "app/modules/navbar/navbar";

const Home = () => {
  const history = useHistory();

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