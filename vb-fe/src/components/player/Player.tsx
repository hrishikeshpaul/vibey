import React, { useState, useEffect } from "react";

import { Flex, Avatar, Box, Link, Text, IconButton, HStack, position } from "@chakra-ui/react";
import { FaStepBackward, FaStepForward, FaPause, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { State } from "_store/rootReducer";
import { SimplifiedArtist } from "util/Playlist";
import { PlayerConstants, PlayerStates } from "_store/player/PlayerTypes";
import { pauseTrack, playNext, playPrevious, resumeTrack } from "_store/player/PlayerActions";
import { WebPlayer } from "util/Player";

export const Player = (): JSX.Element => {
  const track = useSelector((state: State) => state.player.track);
  const trackState = useSelector((state: State) => state.player.state);
  const trackPosition = useSelector((state: State) => state.player.trackPosition);
  const contextUri = useSelector((state: State) => state.player.playlistContext);
  const dispatch = useDispatch();

  return (
    <>
      {track ? (
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" overflow="hidden">
            <Avatar src={track.album.images[0].url} size="md" borderRadius="lg" />
            <Box overflow="hidden">
              <Text isTruncated lineHeight="1.2" pl="3">
                <Link isExternal href={track.href}>
                  {track.name}
                </Link>
              </Text>
              <Text fontSize="sm" isTruncated pl="3">
                {track.artists.map((artist: SimplifiedArtist) => artist.name).join(",")}
              </Text>
            </Box>
          </Flex>
          <Flex>
            <HStack spacing="3">
              <IconButton icon={<FaStepBackward />} aria-label="track-back" onClick={() => dispatch(playPrevious())} />
              {trackState === PlayerStates.PLAYING ? (
                <IconButton icon={<FaPause />} aria-label="track-back" onClick={() => dispatch(pauseTrack())} />
              ) : (
                <IconButton
                  icon={<FaPlay />}
                  aria-label="track-back"
                  onClick={() => dispatch(resumeTrack(contextUri, trackPosition))}
                />
              )}

              <IconButton icon={<FaStepForward />} aria-label="track-back" onClick={() => dispatch(playNext())} />
            </HStack>
          </Flex>
        </Flex>
      ) : null}
    </>
  );
};
