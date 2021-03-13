import React, { useEffect } from "react";
import "./home.scss";
import Navbar from "app/components/navbar/navbar";
import { useDispatch } from "react-redux";
import { getLoginRedirect } from "app/store/user/userActions";
import { BASE_URL } from "app/static/url";
import Icon from "app/components/icon/icon";
import io from "socket.io-client";

let socket;

const Home = () => {
  const dispatch = useDispatch();

  /*
   * On initial render, socket is established
   * { transports: ["websocket"] } included due to CORS issue
   *
   */
  useEffect(() => {
    socket = io(BASE_URL, { transports: ["websocket"] });
  }, []);

  /**
   * Calls an action to redirect to the Spotify Login
   */
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
            className="btn btn-lg btn-primary text-white font-weight-bold d-flex justify-content-center align-items-center"
            onClick={handleSignIn}
          >
            <Icon icon="spotify" size={[1.5, 1.5]}></Icon>{" "}
            <span className="pl-3">Sign in via Spotify</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
