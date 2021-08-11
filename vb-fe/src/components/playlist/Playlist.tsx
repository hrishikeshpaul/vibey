import React, { FunctionComponent } from "react";

import { Avatar, Box, Heading, Text, Flex, IconButton, Icon, VStack } from "@chakra-ui/react";
import { Playlist as PlaylistType } from "util/Playlist";
import { FaPlay } from "react-icons/fa";
import { HiVolumeUp } from "react-icons/hi";

import "components/playlist/Playlist.scss";
import { useDispatch, useSelector } from "react-redux";
import { playTrack } from "_store/player/PlayerActions";
import { State } from "_store/rootReducer";

interface Props {
  playlists: PlaylistType[];
}

interface PlaylistItemProps {
  playlist: PlaylistType;
  index: number;
}

export const PlaylistItem: FunctionComponent<PlaylistItemProps> = ({ playlist }) => {
  const dispatch = useDispatch();
  const playlistContext = useSelector((state: State) => state.player.playlistContext);

  const onPlay = () => {
    dispatch(playTrack(playlist.uri));
  };
  return (
    <Flex
      alignItems="center"
      _hover={{ bgColor: "gray.800" }}
      borderRadius="lg"
      p="3"
      className="vb-playlist-item"
      onClick={onPlay}
    >
      <Box pr="3">
        {playlistContext === playlist.uri ? (
          <Icon fontSize="lg" size="lg" color="teal.400">
            <HiVolumeUp />
          </Icon>
        ) : (
          <Icon size="lg" fontSize="md" boxSize={[18, 18]}>
            <FaPlay />
          </Icon>
        )}
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
