import React from "react";
import './home.scss';
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('v-token');
    history.push('/')
  }

  return (
    <div>
      <h1>HOME</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;