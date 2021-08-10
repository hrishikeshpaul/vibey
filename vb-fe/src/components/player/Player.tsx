import React, { useState } from "react";

import { Flex, Avatar, Box, Link, Text, IconButton, HStack } from "@chakra-ui/react";
import { FaStepBackward, FaStepForward, FaPause, FaPlay } from "react-icons/fa";

export const Player = (): JSX.Element => {
  const [paused, setPaused] = useState<boolean>(true);

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="center" overflow="hidden">
        <Avatar src="https://i.scdn.co/image/ab67616d00004851a7354aa08bc3e76f416f194e" size="md" borderRadius="lg" />
        <Box overflow="hidden">
          <Text isTruncated lineHeight="1.2" pl="3">
            <Link isExternal href="https://open.spotify.com/track/5RScucFoUuNzhLWwGWy05b">
              Name of song that gets truncates if too long
            </Link>
          </Text>
          <Text fontSize="sm" isTruncated pl="3">
            <Link isExternal href="https://open.spotify.com/artist/0SfsnGyD8FpIN4U4WCkBZ5" variant="secondary">
              Artist name
            </Link>
          </Text>
        </Box>
      </Flex>
      <Flex>
        <HStack spacing="3">
          <IconButton icon={<FaStepBackward />} aria-label="track-back" />
          <IconButton icon={paused ? <FaPause /> : <FaPlay />} aria-label="track-back" />
          <IconButton icon={<FaStepForward />} aria-label="track-back" />
        </HStack>
      </Flex>
    </Flex>
  );
};
