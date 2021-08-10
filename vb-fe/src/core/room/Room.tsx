import React, { useEffect, useState } from "react";

import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { Flex, IconButton, Heading, Box, Button, HStack, Icon, Text, Badge } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { HiPencil, HiShare } from "react-icons/hi";
import { RiPlayListFill } from "react-icons/ri";
import { IoPeople } from "react-icons/io5";
import { FaInfo } from "react-icons/fa";

import { Navbar, CurrentUsers, Player } from "components";
import { Layout } from "layout/Layout";
import { State } from "_store/rootReducer";
import { useLocation } from "react-router-dom";
import { Room as RoomType } from "util/Room";
import { SystemConstants } from "_store/system/SystemTypes";
import { User } from "util/User";

export const Room = () => {
  const socket = useSelector((state: State) => state.system.socket);
  const location = useLocation();
  const dispatch = useDispatch();
  const [room, setRoom] = useState<RoomType | null>(null);
  const currentUser: User | null = JSON.parse(localStorage.getItem("v-user") || "");

  console.log(currentUser);

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

  const RoomToolbar = (): JSX.Element => {
    return (
      <Flex alignItems="center" justifyContent="space-between" pt="6" pb="6" bg="primaryDark">
        <IconButton icon={<IoMdArrowBack />} aria-label="room-back" bg="primaryDark" ml={-3} fontSize="2xl" />

        <HStack spacing={3}>
          <IconButton icon={<FaInfo />} aria-label="room-back" bg="primaryDark" ml={-3} fontSize="xl" />
          <IconButton icon={<RiPlayListFill />} aria-label="room-back" bg="primaryDark" fontSize="2xl" />

          {room?.host._id === currentUser?._id && (
            <IconButton icon={<HiPencil />} aria-label="room-back" bg="primaryDark" fontSize="2xl" />
          )}
          <IconButton icon={<HiShare />} aria-label="room-back" bg="primaryDark" fontSize="2xl" />
          <Flex justifyContent="center" alignItems="center">
            <IconButton icon={<IoPeople />} aria-label="room-back" bg="primaryDark" fontSize="2xl" />
            <Text pl="1" fontSize="sm">
              {room?.currentUsers.length}
            </Text>
          </Flex>
        </HStack>
      </Flex>
    );
  };

  return (
    <>
      <Layout.Wrapper>
        <Layout.Header>
          <Navbar isAuth />
          <RoomToolbar />
        </Layout.Header>
        {room ? (
          <>
            <Layout.Body>
              <Layout.Content flex="0.7" mx={0}>
                <Box>
                  <Heading>{room.name}</Heading>
                  <Text size="sm" color="gray.200">
                    {moment(room.start).format("DD MMM YYYY • hh:mm A")}
                  </Text>
                </Box>
              </Layout.Content>
              <Layout.Sidebar flex="0.3">
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
