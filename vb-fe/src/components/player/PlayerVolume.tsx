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
import { useDebounce } from "util/Input";
import { WebPlayer } from "core/player/Player";

export const PlayerVolume: FunctionComponent = (): JSX.Element => {
  const [debounce] = useDebounce();
  const [volume, setVolume] = useState<number | null>(null);

  useEffect(() => {
    WebPlayer.getPlayer()
      .getVolume()
      .then((vol: number) => {
        setVolume(vol * 100);
      });
  }, []);

  const onVolumeChange = (value: number) => {
    debounce(value, (vol: any) => {
      setVolume(vol);
      WebPlayer.getPlayer().setVolume(vol / 100);
    });
  };

  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <IconButton icon={volume && volume > 0 ? <HiVolumeUp /> : <HiVolumeOff />} aria-label="track-volume" />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            {volume !== null && (
              <Slider
                onChange={onVolumeChange}
                aria-label="vb-volume-slider"
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
