import React, { FunctionComponent, useEffect, useState } from "react";

import { Avatar, Box, Heading, Text, Flex, Icon, VStack } from "@chakra-ui/react";
import { BsPlayFill, BsMusicNoteList } from "react-icons/bs";
import { HiVolumeUp } from "react-icons/hi";
import { TiMediaPause } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

import { playTrack } from "_store/player/PlayerActions";
import { State } from "_store/rootReducer";
import { getUserPlaylistsAction } from "_store/room/RoomActions";
import { usePagination } from "util/Input";
import { Playlist as PlaylistType, SpotifyImage } from "util/Playlist";

import "components/playlist/Playlist.scss";
import { PlayerStates } from "_store/player/PlayerTypes";

interface PlaylistItemProps {
  playlist: PlaylistType;
  index: number;
}

export const PlaylistItem: FunctionComponent<PlaylistItemProps> = ({ playlist }) => {
  const dispatch = useDispatch();
  const playlistContext = useSelector((state: State) => state.player.playlistContext);
  const { state } = useSelector((states: State) => states.player);
  playlist.owner.displayName = playlist.owner.display_name || "Spotify User"; //eslint-disable-line
  const isCurrent = playlistContext === playlist.uri;

  const onPlay = () => {
    if (isCurrent && state === PlayerStates.PLAYING) {
      // WebPlayer.getPlayer().pause();
    } else if (isCurrent && state === PlayerStates.PAUSED) {
      // WebPlayer.getPlayer().resume();
    } else if (!isCurrent) {
      dispatch(playTrack(playlist.uri));
    }
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
      <Flex overflow="hidden" alignItems="center" width="100%">
        <Box position="relative">
          <Avatar
            src={imgCheck(playlist.images)}
            size="md"
            borderRadius="lg"
            icon={<BsMusicNoteList />}
            bg="gray.500"
          />
          <Flex
            h="100%"
            w="100%"
            bg="blackAlpha.700"
            position="absolute"
            top="0"
            borderRadius="lg"
            justifyContent="center"
            alignItems="center"
            className={`image-overlay ${isCurrent ? "is-playing" : ""}`}
          >
            {isCurrent ? (
              <>
                <Icon fontSize="xl" size="lg" className="playing-icon">
                  <HiVolumeUp />
                </Icon>
                <Icon fontSize="2xl" size="lg" className="pause-icon">
                  <TiMediaPause />
                </Icon>
              </>
            ) : (
              <Icon fontSize="2xl">
                <BsPlayFill />
              </Icon>
            )}
          </Flex>
        </Box>
        <Box overflow="hidden" pl="3" width="100%">
          <Heading isTruncated fontSize="sm" fontWeight="500" color={isCurrent ? "teal.300" : "white"}>
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

export const Playlist: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
  const { playlistLoading } = useSelector((state: State) => state.room);
  const [playlistOffset, setPlaylistOffset] = useState<number>(0);
  const playlists = useSelector((state: State) => state.room.playlists);

  useEffect(() => {
    dispatch(getUserPlaylistsAction(playlistOffset));
    setPlaylistOffset(playlistOffset + 10);
  }, []); //eslint-disable-line

  usePagination(() => {
    dispatch(getUserPlaylistsAction(playlistOffset));
    setPlaylistOffset(playlistOffset + 10);
  });

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

  return !playlistLoading ? ( // eslint-disable-line
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
