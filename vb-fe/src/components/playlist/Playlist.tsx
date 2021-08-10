import React, { FunctionComponent } from "react";

import { Avatar, Box, Heading, Text, Flex, IconButton, Icon, VStack } from "@chakra-ui/react";
import { Playlist as PlaylistType } from "util/Playlist";
import { FaPlay } from "react-icons/fa";

import "components/playlist/Playlist.scss";

interface Props {
  playlists: PlaylistType[];
}

interface PlaylistItemProps {
  playlist: PlaylistType;
  index: number;
}

export const PlaylistItem: FunctionComponent<PlaylistItemProps> = ({ playlist }) => {
  return (
    <Flex alignItems="center" _hover={{ bgColor: "gray.800" }} borderRadius="lg" p="3" className="vb-playlist-item">
      <Box pr="3">
        <Icon fontSize="md" size="md">
          <FaPlay />
        </Icon>
      </Box>
      <Flex overflow="hidden" alignItems="center">
        <Avatar src={playlist.images[0].url} size="md" borderRadius="lg" />
        <Box overflow="hidden" pl="3">
          <Heading isTruncated fontSize="sm" fontWeight="500">
            {playlist.name}
          </Heading>
          <Text fontSize="sm" isTruncated color="gray.300">
            {playlist.description}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export const Playlist: FunctionComponent<Props> = ({ playlists }): JSX.Element => {
  return (
    <VStack spacing={4}>
      {playlists.map(
        (playlist: PlaylistType, i: number): JSX.Element => (
          <PlaylistItem playlist={playlist} index={i} key={playlist.id} />
        ),
      )}
    </VStack>
  );
};
