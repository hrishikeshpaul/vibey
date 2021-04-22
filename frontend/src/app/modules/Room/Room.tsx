/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Room.scss";
import RoomToolbar from "./RoomToolbar/RoomToolbar";
import RoomPlaylist from "./RoomPlaylist/RoomPlaylist";
import RoomEvents from "./RoomEvents/RoomEvents";
import { Badge } from "@chakra-ui/react";
import { Tag } from "app/models/tag.model";

const Room = () => {
  const dispatch = useDispatch();
  const tags = [
    {
      label: "rock",
      value: "rock",
      score: 24,
    },
    {
      label: "alt",
      value: "alt",
      score: 12,
    },
  ] as Tag[];

  return (
    <div className="container text-white">
      <RoomToolbar></RoomToolbar>
      <br></br>
      <div className="h3 font-weight-bolder">
        <div>Paul's Rock Room - This name can be longer</div>
        <div className="h6 pt-2">
          {tags.map((tag, i) => (
            <Badge
              className={`px-2 py-1 rounded-lg bg-light my-2 text-white ${
                i !== 0 ? "ml-2" : ""
              }`}
              key={i}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 my-3">
          <div className="h6 m-0 dark-link font-weight-bold">
            hrishikeshpaul
          </div>
          <div className="h6 pt-2">
            The aim is to get the listener not only to stop but to fully absorb
            the song. If they read the description, become even more intrigued,
            and start checking out even more music from the artist, that is a
            touchdown.
          </div>
        </div>
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 my-3">
          <RoomPlaylist></RoomPlaylist>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 my-3">
          <RoomEvents></RoomEvents>
        </div>
      </div>
    </div>
  );
};

export default Room;
