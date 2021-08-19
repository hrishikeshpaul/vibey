import React, { FunctionComponent, useEffect, useState } from "react";

import { Flex, Avatar, Box, Text, IconButton, HStack, Divider } from "@chakra-ui/react";
import { BsMusicNote } from "react-icons/bs";
import { FaStepBackward, FaStepForward, FaPlay } from "react-icons/fa";
import { RiShuffleFill } from "react-icons/ri";
import { TiMediaPause } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

import { State } from "_store/rootReducer";
import { playNext, playPrevious, shuffleAction } from "_store/player/PlayerActions";
import { PlayerConstants, PlayerStates } from "_store/player/PlayerTypes";
import { useSpotifyPlayer, usePlaybackState } from "core/player";
import { PlayerVolume } from "components/player/PlayerVolume";
import { PlayerSeeker } from "components/player/PlayerSeek";
import { SimplifiedArtist } from "util/Playlist";

export { PlayerVolume } from "components/player/PlayerVolume";

interface PlayerControlProps {
  showVolume?: boolean;
  showShuffle?: boolean;
}

interface PlayerControlsState {
  shuffle: boolean;
  position: number;
}

export const PlayerControls: FunctionComponent<PlayerControlProps> = ({
  showVolume = true,
  showShuffle = true,
}): JSX.Element => {
  const dispatch = useDispatch();
  const player = useSpotifyPlayer();
  const playbackState = usePlaybackState(true, 1000);
  const { shuffle, state } = useSelector((states: State) => states.player);
  const [playerState, setPlayerState] = useState<PlayerControlsState>({
    shuffle: false,
    position: 0,
  });

  useEffect(() => {
    if (playbackState) {
      if (playbackState.paused && (state === PlayerStates.PLAYING || state === PlayerStates.INITIAL)) {
        dispatch({ type: PlayerConstants.PAUSE });
      } else if (!playbackState.paused && (state === PlayerStates.PAUSED || state === PlayerStates.INITIAL)) {
        dispatch({ type: PlayerConstants.PAUSE });
      }
      setPlayerState({
        shuffle: playbackState.shuffle,
        position: playbackState.position,
      });
    }
  }, [playbackState]); // eslint-disable-line

  const Shuffle: FunctionComponent = (): JSX.Element => {
    return (
      <IconButton
        fontWeight="bold"
        color={playerState.shuffle ? "teal.300" : "white"}
        icon={<RiShuffleFill />}
        aria-label="track-shuffle"
        onClick={() => dispatch(shuffleAction())}
      />
    );
  };

  const previous = () => {
    dispatch(playPrevious());
  };

  const next = () => {
    dispatch(playNext());
  };

  return (
    <Flex>
      <HStack spacing="3">
        <IconButton
          icon={<FaStepBackward />}
          aria-label="track-prev"
          onClick={previous}
          disabled={state === PlayerStates.INITIAL}
        />
        {state === PlayerStates.PLAYING ? (
          <IconButton icon={<TiMediaPause />} fontSize="3xl" aria-label="track-pause" onClick={() => player!.pause()} />
        ) : (
          <IconButton
            icon={<FaPlay />}
            aria-label="track-play"
            onClick={() => player!.resume()}
            disabled={state === PlayerStates.INITIAL}
          />
        )}
        <IconButton
          icon={<FaStepForward />}
          aria-label="track-next"
          onClick={next}
          disabled={state === PlayerStates.INITIAL}
        />
        <Divider />
        {showShuffle && <Shuffle />}
        {showVolume && <PlayerVolume />}
      </HStack>
    </Flex>
  );
};

export const Player: FunctionComponent = (): JSX.Element => {
  const { track } = useSelector((state: State) => state.player);
  const dispatch = useDispatch();
  const playbackState = usePlaybackState(true, 1000);

  useEffect(() => {
    if (playbackState) {
      if (track !== null && playbackState.track_window.current_track.id !== track.id) {
        console.log("here");
        dispatch({
          type: PlayerConstants.UPDATE_TRACK,
          payload: playbackState.track_window.current_track,
        });
      }

      if (track === null) {
        dispatch({
          type: PlayerConstants.UPDATE_TRACK,
          payload: playbackState.track_window.current_track,
        });
      }
    }
  }, [playbackState, track, dispatch]);

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
