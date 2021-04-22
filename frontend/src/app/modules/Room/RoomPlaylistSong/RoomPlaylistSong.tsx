/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { PropsWithChildren } from "react";
import { useDispatch } from "react-redux";
import "./RoomPlaylistSong.scss";
import { Avatar, Flex, Box } from "@chakra-ui/react";

type RoomPlaylistSongProps = {};

const RoomPlaylistSong = (props: PropsWithChildren<RoomPlaylistSongProps>) => {
  return (
    <div className="btn btn-light p-0 d-flex align-items-center song-btn justify-content-between py-2">
      <div className="mr-3">
        1 
      </div>
      <div className="d-flex align-items-center w-100">
      <Avatar
        src="https://picsum.photos/seed/picsum/200/300"
        alt="song-album-art"
        size="sm"
      ></Avatar>
      <div className="song-details ml-3 text-left w-75 long-txt">
        <div className="font-weight-bold mb-0 song-name long-txt pt-1" style={{lineHeight: 0.8}}>
          This is the name of the song, and it can be long
        </div>
        <p className="mb-0 song-artist light-text">Artist Name</p>
      </div>
      </div>
    </div>
  );
};

export default RoomPlaylistSong;
