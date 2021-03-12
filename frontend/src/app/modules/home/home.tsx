import React from "react";
import "./home.scss";
import Navbar from "app/components/navbar/navbar";
import { login } from "app/services/auth.service";
import Icon from 'app/components/icon/icon';

const Home = () => {
  /*
   * login callback returns res.data (query string)
   * query string for forwarding to spotify login
   * spotify returns us to Redirect component
   */
  const handleSignIn = async () => {
    try {
      const res = await login();
      window.open(res.data, "_self");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-100 d-flex justify-content-center align-items-center main-body flex-column">
        <div className="h1 text-center title">
          Make listening to music, <div className="text-primary">more fun.</div>
        </div>
        <div className="pt-2 subtitle">
          Vibe with people with the same taste in music.
        </div>
        <div className="mt-5">
          <button 
            className="btn btn-lg btn-primary text-white font-weight-bold d-flex justify-content-center align-items-center"
            onClick={handleSignIn}
            >
            <Icon icon="spotify" size={[1.5, 1.5]}></Icon> <span className="pl-3">Sign in via Spotify</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
