/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import './Room.scss';
import RoomToolbar from './RoomToolbar';

const Room = () => {
  const dispatch = useDispatch();

  return (
    <div className="container text-white">
      <RoomToolbar></RoomToolbar>
    </div>
  )
}

export default Room;
