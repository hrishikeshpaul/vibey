import React, { FunctionComponent } from "react";

import { Flex, Avatar, Box, Link, Text, IconButton, HStack, Divider } from "@chakra-ui/react";
import { FaStepBackward, FaStepForward, FaPause, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { PlayerVolume } from "components/player/PlayerVolume";
import { PlayerSeeker } from "components/player/PlayerSeek";
import { State } from "_store/rootReducer";
import { SimplifiedArtist } from "util/Playlist";
import { PlayerStates } from "_store/player/PlayerTypes";
import { playNext, playPrevious } from "_store/player/PlayerActions";
import { WebPlayer } from "core/player/Player";

interface PlayerControlProps {
  showVolume?: boolean;
}

const PlayerControls: FunctionComponent<PlayerControlProps> = ({ showVolume = true }): JSX.Element => {
  const trackState = useSelector((state: State) => state.player.state);
  const dispatch = useDispatch();

  return (
    <Flex>
      <HStack spacing="3">
        <IconButton icon={<FaStepBackward />} aria-label="track-prev" onClick={() => dispatch(playPrevious())} />
        {trackState === PlayerStates.PLAYING ? (
          <IconButton icon={<FaPause />} aria-label="track-pause" onClick={() => WebPlayer.getPlayer().pause()} />
        ) : (
          <IconButton icon={<FaPlay />} aria-label="track-play" onClick={() => WebPlayer.getPlayer().resume()} />
        )}
        <IconButton icon={<FaStepForward />} aria-label="track-next" onClick={() => dispatch(playNext())} />
        <Divider />
        {showVolume && <PlayerVolume />}
      </HStack>
    </Flex>
  );
};

export const Player = (): JSX.Element => {
  const track = useSelector((state: State) => state.player.track);
  return (
    <>
      {track ? (
        <Flex alignItems="center" justifyContent="space-between" p="4" overflow="hidden" style={{ gap: "30px" }}>
          <Flex alignItems="center" overflow="hidden" flex={{ base: "0.8", md: "0.3" }}>
            <Avatar src={track.album.images[0].url} size="md" borderRadius="lg" />
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
