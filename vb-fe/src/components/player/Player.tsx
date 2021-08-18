import React, { FunctionComponent } from "react";

import { Flex, Avatar, Box, Text, IconButton, HStack, Divider } from "@chakra-ui/react";
import { BsMusicNote } from "react-icons/bs";
import { FaStepBackward, FaStepForward, FaPlay } from "react-icons/fa";
import { RiShuffleFill } from "react-icons/ri";
import { TiMediaPause } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

import { State } from "_store/rootReducer";
import { playNext, playPrevious, shuffleAction } from "_store/player/PlayerActions";
import { PlayerStates } from "_store/player/PlayerTypes";

import { PlayerVolume } from "components/player/PlayerVolume";
import { PlayerSeeker } from "components/player/PlayerSeek";
import { SimplifiedArtist } from "util/Playlist";

export { PlayerVolume } from "components/player/PlayerVolume";

interface PlayerControlProps {
  showVolume?: boolean;
  showShuffle?: boolean;
}

export const PlayerControls: FunctionComponent<PlayerControlProps> = ({
  showVolume = true,
  showShuffle = true,
}): JSX.Element => {
  const dispatch = useDispatch();
  const { shuffle, state } = useSelector((states: State) => states.player);
  const trackState = useSelector((states: State) => states.player.state);

  const Seek: FunctionComponent = (): JSX.Element => {
    return (
      <IconButton
        fontWeight="bold"
        color={shuffle ? "teal.300" : "white"}
        icon={<RiShuffleFill />}
        aria-label="track-shuffle"
        onClick={() => dispatch(shuffleAction())}
        disabled={state === PlayerStates.INITIAL}
      />
    );
  };

  return (
    <Flex>
      <HStack spacing="3">
        <IconButton
          icon={<FaStepBackward />}
          aria-label="track-prev"
          onClick={() => dispatch(playPrevious())}
          disabled={state === PlayerStates.INITIAL}
        />
        {trackState && trackState === PlayerStates.PLAYING ? (
          <IconButton
            icon={<TiMediaPause />}
            fontSize="3xl"
            aria-label="track-pause"
            // onClick={() => WebPlayer.getPlayer().pause()}
            disabled={state === PlayerStates.INITIAL}
          />
        ) : (
          <IconButton
            icon={<FaPlay />}
            aria-label="track-play"
            // onClick={() => WebPlayer.getPlayer().resume()}
            disabled={state === PlayerStates.INITIAL}
          />
        )}
        <IconButton
          icon={<FaStepForward />}
          aria-label="track-next"
          onClick={() => dispatch(playNext())}
          disabled={state === PlayerStates.INITIAL}
        />
        <Divider />
        {showShuffle && <Seek />}
        {showVolume && <PlayerVolume />}
      </HStack>
    </Flex>
  );
};

export const Player: FunctionComponent = (): JSX.Element => {
  const track = useSelector((state: State) => state.player.track);
  console.log(track);
  return (
    <>
      {track ? (
        <Flex alignItems="center" justifyContent="space-between" p="4" overflow="hidden" style={{ gap: "30px" }}>
          <Flex alignItems="center" overflow="hidden" flex={{ base: "0.8", md: "0.3" }}>
            <Avatar src={track.album.images[0].url} size="md" borderRadius="lg" icon={<BsMusicNote />} bg="gray.500" />
            <Box overflow="hidden">
              <Text isTruncated lineHeight="1.2" pl="3">
                {track.name}
              </Text>
              <Text fontSize="sm" isTruncated pl="3" color="gray.100">
                {track.artists.map((artist: SimplifiedArtist) => artist.name).join(", ")}
              </Text>
            </Box>
          </Flex>
          <Box flex="0.6" w="100%" display={{ base: "none", md: "block" }}>
            <PlayerSeeker />
          </Box>
          <Box flex={{ base: "0.2", md: "0.1" }}>
            <PlayerControls />
          </Box>
        </Flex>
      ) : null}
    </>
  );
};
