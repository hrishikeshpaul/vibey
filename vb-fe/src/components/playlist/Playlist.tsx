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
    <Flex alignItems="center" _hover={{ bgColor: "gray.800" }} borderRadius="lg" p="2" className="vb-playlist-item">
      <Box pr="3">
        <Icon fontSize="md" size="md">
          <FaPlay />
        </Icon>
      </Box>
      <Flex overflow="hidden">
        <Avatar src={playlist.images[0].url} size="md" borderRadius="lg" />
      </Flex>
    </Flex>
  );
};

export const Playlist: FunctionComponent<Props> = ({ playlists }): JSX.Element => {
  return (
    <Box bg="dark" height="100%" position="relative" borderRadius="lg" overflow="hidden" className="vb-playlist">
      <Heading size="sm" p="6">
        Playlist
      </Heading>
      <Box top="50px" position="absolute" w="100%" p="6" left="0" right="0" bottom="0" overflowY="auto">
        <VStack spacing={4}>
          {playlists.map(
            (playlist: PlaylistType, i: number): JSX.Element => (
              <PlaylistItem playlist={playlist} index={i} key={playlist.id} />
            ),
          )}
        </VStack>
      </Box>
    </Box>
  );
};
