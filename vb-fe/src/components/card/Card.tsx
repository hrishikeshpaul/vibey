import React, { FunctionComponent } from "react";

import { Box, Flex, Text, Icon, Badge, Avatar, Heading, Link } from "@chakra-ui/react";
import { push } from "connected-react-router";
import moment from "moment";
import { useDispatch } from "react-redux";
import { IoPeople } from "react-icons/io5";
import { BsMusicNote } from "react-icons/bs";

import { Room } from "util/Room";
import { Tag } from "util/Tags";

import "components/card/Card.scss";

interface Props {
  room: Room;
}

export const Card: FunctionComponent<Props> = ({ room }): JSX.Element => {
  const dispatch = useDispatch();

  const joinRoom = () => {
    dispatch(push(`/room/${room._id}`));
  };

  return (
    <Box
      tabIndex={0}
      bg="dark"
      borderRadius="lg"
      p={5}
      id="vb-card"
      className="vb-card"
      borderColor="dark"
      _hover={{ cursor: "pointer", border: "2px solid teal" }}
      onClick={joinRoom}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box flex="0.9" overflow="hidden" pr={3}>
          <Heading fontSize="lg" fontWeight="600" isTruncated>
            {room.name}
          </Heading>
        </Box>
        <Badge bg="transparent" color="white">
          <Flex flex="0.1" justifyContent="center" alignItems="center">
            <Icon as={IoPeople} w={5} h={5} />
            <Text pl="1" fontSize="sm">
              {room.users.length}
            </Text>
          </Flex>
        </Badge>
      </Flex>
      <Flex>
        <Text fontSize="sm" color="gray.100">
          {room.host.username}
        </Text>
        <Text fontSize="sm" color="gray.100" px="1">
          •
        </Text>
        <Text fontSize="sm" color="gray.100">
          {moment(room.start).format("HH:ss A")}
        </Text>
      </Flex>
      <Flex mt="1" flexWrap="wrap" overflow="hidden" maxH="25px">
        <Box id="vb-card-badge-box">
          {room.tags.map((tag: Tag, i: number) => (
            <Badge colorScheme="teal" mr={2} borderRadius="md" key={tag._id}>
              {tag.label}
            </Badge>
          ))}
        </Box>
      </Flex>
      <Flex mt="5" alignItems="center">
        <Avatar src={room.track.image} size="md" borderRadius="lg" icon={<BsMusicNote />} />
        {room.track.name ? (
          <Box overflow="hidden">
            <Text fontSize="sm" isTruncated lineHeight="1.2" pl="3">
              <Link isExternal href="https://open.spotify.com/track/5RScucFoUuNzhLWwGWy05b">
                {room.track.name}
              </Link>
            </Text>
            <Text fontSize="xs" isTruncated pl="3">
              <Link isExternal href="https://open.spotify.com/artist/0SfsnGyD8FpIN4U4WCkBZ5" variant="secondary">
                {room.track.artist}
              </Link>
            </Text>
          </Box>
        ) : (
          <Text pl="3">Not vibing yet</Text>
        )}
      </Flex>
      <Box position="absolute" className="vb-room-join">
        <Badge colorScheme="gray" variant="solid" borderRadius="lg" px="2" py="1">
          Click to join
        </Badge>
      </Box>
    </Box>
  );
};
