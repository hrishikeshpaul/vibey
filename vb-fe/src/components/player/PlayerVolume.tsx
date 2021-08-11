import React, { FunctionComponent } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import { State } from "_store/rootReducer";

export const PlayerVolume: FunctionComponent = (): JSX.Element => {
  const [debounce] = useDebounce();
  const volume = useSelector((state: State) => state.player.volume);
  const dispatch = useDispatch();

  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <IconButton icon={<HiVolumeUp />} aria-label="track-volume" />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Slider
              onChange={(value: number) => {
                debounce(value, () => {
                  console.log(value);
                });
              }}
              aria-label="slider-ex-3"
              defaultValue={volume}
              max={100}
              min={0}
              colorScheme="teal"
              style={{ position: "absolute" }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
