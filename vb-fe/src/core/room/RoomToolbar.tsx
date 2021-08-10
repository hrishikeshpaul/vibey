import React, { FunctionComponent } from "react";
import { Flex, IconButton, HStack, Text, Icon, Box, Heading } from "@chakra-ui/react";
import { HiPencil, HiShare } from "react-icons/hi";
import { IoPeople } from "react-icons/io5";
import { FaInfo } from "react-icons/fa";

import { ReactComponent as Back } from "assets/icons/back.svg";
import { Room } from "util/Room";
import { User } from "util/User";

interface Props {
  room: Room;
  currentUser: User;
}

export const RoomToolbar: FunctionComponent<Props> = ({ room, currentUser }): JSX.Element => {
  const BackIcon = (): JSX.Element => {
    return (
      <Icon>
        <Back />
      </Icon>
    );
  };

  return (
    <Flex alignItems="center" justifyContent="space-between" pt="6" pb="6" bg="primaryDark">
      <Flex alignItems="center" overflow="hidden">
        <IconButton icon={<BackIcon />} aria-label="room-back" bg="primaryDark" color="white" fontSize="xl" />
        <Heading fontSize="xl" pl="3" isTruncated display={{ base: "block", lg: "none" }}>
          {room.name}
        </Heading>
      </Flex>

      <HStack spacing={3}>
        <IconButton icon={<FaInfo />} aria-label="room-back" bg="primaryDark" fontSize="xl" />

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
