/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { PropsWithChildren } from "react";
import { useDispatch } from "react-redux";
import "./RoomPlaylistSong.scss";
import { Avatar } from "@chakra-ui/react";

type RoomPlaylistSongProps = {};

const RoomPlaylistSong = (props: PropsWithChildren<RoomPlaylistSongProps>) => {
  return (
    <div className="btn btn-light p-0  d-flex align-items-center song-btn px-2">
      <Avatar
        src="https://picsum.photos/seed/picsum/200/300"
        alt="song-album-art"
        size="sm"
      ></Avatar>
      <div className="song-details ml-3 text-left  w-100 long-txt">
        <p className="font-weight-bold mb-0 song-name">
          This is the name of the song, and it can be long
        </p>
        <p className="mb-0 song-artist">Artist Name</p>
      </div>
    </div>
  );
};

export default RoomPlaylistSong;
