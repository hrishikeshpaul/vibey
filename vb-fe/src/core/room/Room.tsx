import React, { useEffect, useState, FunctionComponent } from "react";

import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Heading, Box, Text, Badge, Wrap, WrapItem } from "@chakra-ui/react";

import { Navbar, CurrentUsers, Player, Playlist } from "components";
import { RoomToolbar } from "core/room/RoomToolbar";
import { Layout } from "layout/Layout";
import { State } from "_store/rootReducer";
import { SystemConstants } from "_store/system/SystemTypes";
import { RoomConstants } from "_store/room/RoomTypes";
import { Room as RoomType } from "util/Room";
import { Tag } from "util/Tags";
import { User } from "util/User";

interface RoomInfoProps {
  name: string;
  start: Date;
  description: string;
  tags: Tag[];
}

export const Room: FunctionComponent = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();
  const socket = useSelector((state: State) => state.system.socket);
  const currentUser: User | null = JSON.parse(localStorage.getItem("v-user") || "");

  const [room, setRoom] = useState<RoomType | null>(null);
  const [isHost, setIsHost] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    dispatch({ type: SystemConstants.LOADING });
    dispatch({ type: RoomConstants.PLAYLIST_LOADING, payload: true });

    if (isMounted && socket) {
      const roomId = location.pathname.split("/")[2];
      if (roomId) {
        socket?.emit("join-room", roomId);
      }

      socket?.on("join-room-success", (data: RoomType) => {
        dispatch({ type: SystemConstants.SUCCESS });
        setIsHost(data.host._id === currentUser?._id);
        setRoom(data);
      });
    }

    return () => {
      isMounted = false;
      dispatch({ type: RoomConstants.ADD_TO_PLAYLIST, payload: [] });
    };
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
          {room && currentUser ? <RoomToolbar room={room} isHost={isHost} /> : <></>}
        </Layout.Header>
        {room ? (
          <>
            <Layout.Body>
              <Layout.Sidebar flex="0.2">
                <RoomInfo {...room} />
              </Layout.Sidebar>
              <Layout.Content flex="0.5">{isHost ? <Playlist /> : <></>}</Layout.Content>
              <Layout.Sidebar flex="0.3" calcSidebarHeight>
                <CurrentUsers users={room.currentUsers} />
              </Layout.Sidebar>
            </Layout.Body>
            <Layout.Footer>
              <Box bg="gray.800" borderTopRightRadius="lg" borderTopLeftRadius="lg">
                <Player />
              </Box>
            </Layout.Footer>
          </>
        ) : (
          <Text>Room Loading..</Text>
        )}
      </Layout.Wrapper>
    </>
  );
};
