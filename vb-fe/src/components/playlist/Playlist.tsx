import React, { FunctionComponent } from "react";

import { Avatar, Box, Heading, Text, Flex, IconButton, Icon, VStack } from "@chakra-ui/react";
import { Playlist as PlaylistType, SpotifyImage } from "util/Playlist";
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
  playlist.owner.displayName = playlist.owner.display_name || "Spotify User"; //eslint-disable-line

  const onPlay = () => {
    dispatch(playTrack(playlist.uri));
  };

  const imgCheck = (images: SpotifyImage[]): string => {
    if (images && images.length > 0) return images[0].url;
    return "";
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
          <Icon fontSize="xl" size="lg" color="teal.400">
            <HiVolumeUp />
          </Icon>
        ) : (
          <Icon size="lg" fontSize="md" boxSize={[18, 18]}>
            <FaPlay />
          </Icon>
        )}
      </Box>
      <Flex overflow="hidden" alignItems="center" width="100%">
        <Avatar src={imgCheck(playlist.images)} size="md" borderRadius="lg" />
        <Box overflow="hidden" pl="3" width="100%">
          <Heading isTruncated fontSize="sm" fontWeight="500">
            {playlist.name}
          </Heading>
          <Text fontSize="sm" isTruncated color="gray.300">
            {playlist.owner.displayName} • {playlist.tracks.total} tracks
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export const Playlist: FunctionComponent<Props> = ({ playlists }): JSX.Element => {
  const { playlistLoading } = useSelector((state: State) => state.room);

  const NoPlaylists: FunctionComponent = () => {
    return (
      <Box textAlign="center" h="100%" display="flex" justifyContent="center" flexDir="column">
        <Text fontSize="lg" color="gray.50" fontWeight="600">
          No playlists found..
        </Text>
        <Text color="gray.200">Head over to your Spotify account and add a playlist!</Text>
      </Box>
    );
  };

  return !playlistLoading ? (
    playlists.length > 0 ? (
      <VStack spacing={4}>
        {playlists.map(
          (playlist: PlaylistType, i: number): JSX.Element => (
            <PlaylistItem playlist={playlist} index={i} key={playlist.id} />
          ),
        )}
      </VStack>
    ) : (
      <NoPlaylists />
    )
  ) : (
    <Text textAlign="center" color="gray.200" fontSize="sm">
      Playlist loading...
    </Text>
  );
};
