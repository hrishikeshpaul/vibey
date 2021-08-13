import React, { useState, useEffect } from "react";
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex, Text } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { State } from "_store/rootReducer";
import { PlayerConstants, PlayerStates } from "_store/player/PlayerTypes";
import useInterval from "util/Interval";

export const PlayerSeeker = () => {
  const { track, state, trackPosition } = useSelector((states: State) => states.player);
  const [position, setPosition] = useState<number>(0);
  const [strPos, setStrPos] = useState<string>("0:00");

  const formatMilliseconds = (milliseconds: number, padStart: boolean): string => {
    function pad(num: number) {
      return `${num}`.padStart(2, "0");
    }
    const asSeconds = milliseconds / 1000;

    let hours;
    let minutes = Math.floor(asSeconds / 60);
    const seconds = Math.floor(asSeconds % 60);

    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      minutes %= 60;
    }

    return hours
      ? `${padStart ? pad(hours) : hours}:${pad(minutes)}:${pad(seconds)}`
      : `${padStart ? pad(minutes) : minutes}:${pad(seconds)}`;
  };

  useEffect(() => {
    setPosition(trackPosition);
  }, [trackPosition]);

  useInterval(
    () => {
      setTimeout(() => {
        setPosition(position + 1000);
      }, 500);
    },
    state === PlayerStates.PLAYING ? 1000 : null,
  );

  return (
    <Flex>
      <Text fontSize="xs" pr="2" color="gray.200">
        {formatMilliseconds(position, false)}
      </Text>
      <Slider
        aria-label="vb-seek-slider"
        colorScheme="teal"
        w="100%"
        max={track?.duration_ms}
        min={0}
        value={position}
        focusThumbOnChange={false}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
      </Slider>
      <Text fontSize="xs" pl="2" color="gray.200">
        {formatMilliseconds(track ? track.duration_ms : 0, false)}
      </Text>
    </Flex>
  );
};
