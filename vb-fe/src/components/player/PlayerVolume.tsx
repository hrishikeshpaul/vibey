import React, { FunctionComponent, useState, useEffect } from "react";

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Box,
  PopoverArrow,
  IconButton,
} from "@chakra-ui/react";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { useSpotifyPlayer } from "core/player/index";

import { useDebounce } from "util/Input";

export const PlayerVolume: FunctionComponent = (): JSX.Element => {
  const player = useSpotifyPlayer();
  const [debounce] = useDebounce();
  const [vol, setVolume] = useState<number | null>(null);

  useEffect(() => {
    if (player) {
      player.getVolume().then((v: number) => {
        setVolume(v * 100);
      });
    }
  }, [player]);

  const onVolumeChange = (value: number) => {
    debounce(value, (v: any) => {
      setVolume(v);
      if (player) player.setVolume(v / 100);
    });
  };

  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <IconButton icon={vol && vol > 0 ? <HiVolumeUp /> : <HiVolumeOff />} aria-label="track-vol" />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            {vol !== null && (
              <Slider
                onChange={onVolumeChange}
                aria-label="vb-vol-slider"
                defaultValue={50}
                max={100}
                min={0}
                minH="150px"
                orientation="vertical"
                colorScheme="teal"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
