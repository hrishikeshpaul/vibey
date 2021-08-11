import React, { useEffect, useState, FunctionComponent } from "react";

import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { Heading, Box, Text, Badge, Wrap, WrapItem } from "@chakra-ui/react";

import { Navbar, CurrentUsers, Player, Playlist } from "components";
import { RoomToolbar } from "core/room/RoomToolbar";
import { Layout } from "layout/Layout";
import { State } from "_store/rootReducer";
import { useLocation } from "react-router-dom";
import { Room as RoomType } from "util/Room";
import { SystemConstants } from "_store/system/SystemTypes";
import { User } from "util/User";
import { getUserPlaylistsAction } from "_store/room/RoomActions";
import { Tag } from "util/Tags";

interface RoomInfoProps {
  name: string;
  start: Date;
  description: string;
  tags: Tag[];
}

export const Room = () => {
  const socket = useSelector((state: State) => state.system.socket);
  const location = useLocation();
  const dispatch = useDispatch();
  const [room, setRoom] = useState<RoomType | null>(null);
  const playlists = useSelector((state: State) => state.room.playlists);
  const currentUser: User | null = JSON.parse(localStorage.getItem("v-user") || "");
  const [playlistOffset, setPlaylistOffset] = useState<number>(0);
  const [isHost, setIsHost] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: SystemConstants.LOADING });
    if (socket) {
      const roomId = location.pathname.split("/")[2];
      if (roomId) {
        socket?.emit("join-room", roomId);
      }

      socket?.on("join-room-success", (data: RoomType) => {
        dispatch({ type: SystemConstants.SUCCESS });
        dispatch(getUserPlaylistsAction(playlistOffset));
        setPlaylistOffset(playlistOffset + 5);
        if (data.host._id === currentUser?._id) setIsHost(true);
        setRoom(data);
      });
    }
  }, [socket]); //eslint-disable-line

  const RoomInfo: FunctionComponent<RoomInfoProps> = ({ start, name, description, tags }): JSX.Element => {
    return (
      <Box>
        <Heading>{name}</Heading>
        <Text size="sm" color="gray.200">
          {moment(start).format("DD MMM YYYY • hh:mm A")}
        </Text>
        <Text pt="5">{description}</Text>
        <Wrap spacing="3" pt="5">
          {tags.map((tag) => (
            <WrapItem key={tag.label}>
              <Badge colorScheme="teal">#{tag.label}</Badge>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    );
  };

  return (
    <>
      <Layout.Wrapper>
        <Layout.Header>
          <Navbar isAuth isHost={isHost} />
          {room && currentUser ? <RoomToolbar room={room} currentUser={currentUser} /> : <></>}
        </Layout.Header>
        {room ? (
          <>
            <Layout.Body>
              <Layout.Sidebar flex="0.2">
                <RoomInfo {...room} />
              </Layout.Sidebar>
              <Layout.Content flex="0.5">
                <Playlist playlists={playlists} />
              </Layout.Content>
              <Layout.Sidebar flex="0.3" calcSidebarHeight>
                <CurrentUsers users={room.currentUsers} />
              </Layout.Sidebar>
            </Layout.Body>
            <Layout.Footer>
              <Box bg="dark" borderTopRightRadius="lg" borderTopLeftRadius="lg">
                <Player />
              </Box>
            </Layout.Footer>
          </>
        ) : (
          <span>Room Loading</span>
        )}
      </Layout.Wrapper>
    </>
  );
};
