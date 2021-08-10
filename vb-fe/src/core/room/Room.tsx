import React, { useEffect, useState, FunctionComponent } from "react";

import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { Flex, IconButton, Heading, Box, Button, HStack, Icon, Text, Badge } from "@chakra-ui/react";

import { Navbar, CurrentUsers, Player } from "components";
import { Layout } from "layout/Layout";
import { State } from "_store/rootReducer";
import { useLocation } from "react-router-dom";
import { Room as RoomType } from "util/Room";
import { SystemConstants } from "_store/system/SystemTypes";
import { User } from "util/User";
import { RoomToolbar } from "./RoomToolbar";

interface RoomInfoProps {
  name: string;
  start: Date;
}

export const Room = () => {
  const socket = useSelector((state: State) => state.system.socket);
  const location = useLocation();
  const dispatch = useDispatch();
  const [room, setRoom] = useState<RoomType | null>(null);
  const currentUser: User | null = JSON.parse(localStorage.getItem("v-user") || "");

  useEffect(() => {
    dispatch({ type: SystemConstants.LOADING });
    if (socket) {
      const roomId = location.pathname.split("/")[2];
      if (roomId) {
        socket?.emit("join-room", roomId);
      }

      socket?.on("join-room-success", (data: RoomType) => {
        dispatch({ type: SystemConstants.SUCCESS });
        setRoom(data);
      });
    }
  }, [socket]); //eslint-disable-line

  const RoomInfo: FunctionComponent<RoomInfoProps> = ({ start, name }): JSX.Element => {
    return (
      <Box>
        <Heading>{name}</Heading>
        <Text size="sm" color="gray.200">
          {moment(start).format("DD MMM YYYY • hh:mm A")}
        </Text>
      </Box>
    );
  };

  return (
    <>
      <Layout.Wrapper>
        <Layout.Header>
          <Navbar isAuth />
          {room && currentUser ? <RoomToolbar room={room} currentUser={currentUser} /> : <></>}
        </Layout.Header>
        {room ? (
          <>
            <Layout.Body>
              <Layout.Sidebar flex="0.25">
                <RoomInfo name={room.name} start={room.start} />
              </Layout.Sidebar>
              <Layout.Content flex="0.45">
                <Heading>Playlist</Heading>
              </Layout.Content>
              <Layout.Sidebar flex="0.3" calcSidebarHeight>
                <CurrentUsers users={room.currentUsers} />
              </Layout.Sidebar>
            </Layout.Body>
            <Layout.Footer>
              <Box bg="dark" p="4" borderTopRightRadius="lg" borderTopLeftRadius="lg">
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
