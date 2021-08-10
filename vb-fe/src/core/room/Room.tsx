import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Flex, IconButton, Heading, Box, Button, HStack, Icon, Text } from "@chakra-ui/react";
import { IoIosArrowRoundBack, IoIosPeople } from "react-icons/io";
import { HiPencil, HiShare } from "react-icons/hi";
import { IoPeople } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";

import { Navbar } from "components";
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
      <Flex alignItems="center" justifyContent="space-between" pt="6" pb="6">
        <IconButton icon={<IoIosArrowRoundBack />} aria-label="room-back" bg="primaryDark" ml={-3} fontSize="4xl" />

        <HStack spacing={3}>
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
        <Layout.Body>
          <Layout.Content flex="0.4" mx={0}>
            <Heading>{room?.name}</Heading>
          </Layout.Content>
          <Layout.Sidebar flex="0.6">
            <Heading>Playlists</Heading>
          </Layout.Sidebar>
        </Layout.Body>
      </Layout.Wrapper>
    </>
  );
};
