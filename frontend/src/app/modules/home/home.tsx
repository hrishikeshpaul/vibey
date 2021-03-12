import React from "react";
import "./home.scss";
import Navbar from "app/components/navbar/navbar";
import { useDispatch } from "react-redux";
import { getLoginRedirect } from "app/store/user/userActions";

const Home = () => {
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    dispatch(getLoginRedirect());
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
            className="btn btn-lg btn-primary text-white font-weight-bold"
            onClick={handleSignIn}
          >
            Sign in via Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
