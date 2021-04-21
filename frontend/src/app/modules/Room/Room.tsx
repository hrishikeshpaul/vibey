/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Room.scss";
import RoomToolbar from "./RoomToolbar/RoomToolbar";
import RoomPlaylist from "./RoomPlaylist/RoomPlaylist";

const Room = () => {
  const dispatch = useDispatch();

  return (
    <div className="container text-white">
      <RoomToolbar></RoomToolbar>
      <br></br>
      <div className="h3 font-weight-bolder">
        Paul's Rock Room - This name can be longer
      </div>
      <div className="h6 dark-link font-weight-bold">hrishikeshpaul</div>
      <div className="h6 pt-2">
        The aim is to get the listener not only to stop but to fully absorb the
        song. If they read the description, become even more intrigued, and
        start checking out even more music from the artist, that is a touchdown.
      </div>

      <div className="row mt-5">
        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
          <RoomPlaylist></RoomPlaylist>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
          Events
        </div>
      </div>
    </div>
  );
};

export default Room;
