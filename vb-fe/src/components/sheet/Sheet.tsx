import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Box, IconButton } from "@chakra-ui/react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MIN_SHEET_HEIGHT, MAX_SHEET_HEIGHT } from "util/Variables";
import { SystemConstants } from "_store/system/SystemTypes";

export const Sheet = (): JSX.Element => {
  const dispatch = useDispatch();
  const [sheetHeight, setSheetHeight] = useState<string>(MIN_SHEET_HEIGHT);
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleHeight = (): void => {
    if (sheetHeight === MIN_SHEET_HEIGHT) {
      setSheetHeight(MAX_SHEET_HEIGHT);
      setExpanded(true);
      dispatch({
        type: SystemConstants.EXPAND_BOTTOM_SHEET,
        payload: true,
      });
    } else {
      setSheetHeight(MIN_SHEET_HEIGHT);
      setExpanded(false);
      dispatch({
        type: SystemConstants.EXPAND_BOTTOM_SHEET,
        payload: false,
      });
    }
  };

  return (
    <Box
      bgColor="gray.700"
      h="100%"
      borderTopLeftRadius="xl"
      borderTopRightRadius="xl"
      mt={10}
      transition="height 0.5s ease-in-out"
      overflowY="auto"
      position="relative"
      minH={MIN_SHEET_HEIGHT}
      p={5}
      height={sheetHeight}
    >
      <Box
        position="sticky"
        w="100%"
        d="flex"
        justifyContent="flex-end"
        top="0"
        zIndex="1000"
        id="vb-sheet-header"
        h={MIN_SHEET_HEIGHT}
      >
        <IconButton
          icon={expanded ? <IoIosArrowDown /> : <IoIosArrowUp />}
          aria-label="up-icon"
          onClick={toggleHeight}
          bg="transparent"
        />
      </Box>
      <Box h="1500px">Player and other room details go here</Box>
    </Box>
  );
};
