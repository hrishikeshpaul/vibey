import React, { useEffect, FunctionComponent } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Heading, Box, Text, Badge, Wrap, WrapItem } from "@chakra-ui/react";

import { RoomConstants } from "_store/room/RoomTypes";
import { joinRoom } from "_store/room/RoomActions";
import { State } from "_store/rootReducer";
import { Navbar, CurrentUsers, Player, Playlist } from "components";
import { RoomToolbar } from "core/room/RoomToolbar";
import { Layout } from "layout/Layout";

import { Tag } from "util/Tags";
import { User } from "util/User";

interface RoomInfoProps {
  name: string;
  start: Date;
  description: string;
  tags: Tag[];
}

export const Room: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser: User | null = JSON.parse(localStorage.getItem("v-user") || "");

  const { currentRoom, isHost } = useSelector((state: State) => state.room);
  const { socketsConnected } = useSelector((state: State) => state.system);

  useEffect(() => {
    let isMounted = true;

    dispatch({ type: RoomConstants.PLAYLIST_LOADING, payload: true });

    if (isMounted && socketsConnected) {
      const roomId = location.pathname.split("/")[2];
      if (roomId) {
        dispatch(joinRoom(roomId));
      }
    }

    return () => {
      isMounted = false;
      dispatch({ type: RoomConstants.ADD_TO_PLAYLIST, payload: [] });
    };
  }, [socketsConnected]); //eslint-disable-line

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
          {currentRoom && currentUser ? <RoomToolbar room={currentRoom} isHost={isHost} /> : <></>}
        </Layout.Header>
        {currentRoom ? (
          <>
            <Layout.Body>
              <Layout.Sidebar flex="0.2">
                <RoomInfo {...currentRoom} />
              </Layout.Sidebar>
              <Layout.Content flex="0.5">{isHost ? <Playlist /> : <></>}</Layout.Content>
              <Layout.Sidebar flex="0.3" calcSidebarHeight>
                <CurrentUsers users={currentRoom.currentUsers} />
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
