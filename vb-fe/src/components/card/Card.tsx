import React from "react";

import { Box, Flex, Text, Icon, Badge, Avatar, Heading, Link } from "@chakra-ui/react";
import { IoPeople } from "react-icons/io5";

import { Tag } from "util/Tags";

import "components/card/Card.scss";

interface Props {
  name: string;
  tags: Tag[];
  profile: any;
  startTime: string;
  track: any;
}

/** Placeholder */
const tags: Tag[] = [
  {
    label: "#edm",
    value: "#edm",
    score: 2,
  },
  {
    label: "#trance",
    value: "#trance",
    score: 3,
  },
  {
    label: "#future-bass",
    value: "#future-bass",
    score: 10,
  },
];

export const Card = (): JSX.Element => {
  return (
    <Box
      tabIndex={0}
      bg="dark"
      borderRadius="lg"
      p={5}
      id="vb-card"
      className="vb-card"
      borderColor="dark"
      _hover={{ cursor: "pointer", border: "2px solid teal" }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box flex="0.9" overflow="hidden" pr={3}>
          <Heading fontSize="md" fontWeight="600" isTruncated>
            This is a cool room name
          </Heading>
        </Box>
        <Badge bg="transparent" color="white">
          <Flex flex="0.1" justifyContent="center" alignItems="center">
            <Icon as={IoPeople} w={4} h={4} />
            <Text pl="1">12</Text>
          </Flex>
        </Badge>
      </Flex>
      <Flex>
        <Text fontSize="xs" color="gray.100">
          nut_kesh
        </Text>
        <Text fontSize="xs" color="gray.100" px="1">
          •
        </Text>
        <Text fontSize="xs" color="gray.100">
          29 minutes ago
        </Text>
      </Flex>
      <Flex mt="1" flexWrap="wrap" overflow="hidden" maxH="25px">
        <Box id="vb-card-badge-box">
          {tags.map((tag: Tag, i: number) => (
            <Badge colorScheme="teal" mr={2} borderRadius="md" key={tag.label}>
              {tag.label}
            </Badge>
          ))}
        </Box>
      </Flex>
      <Flex mt="5" alignItems="center">
        <Avatar src="https://i.scdn.co/image/ab67616d00004851a7354aa08bc3e76f416f194e" size="sm" borderRadius="lg" />
        <Box overflow="hidden">
          <Text fontSize="xs" isTruncated lineHeight="1.2" pl="3">
            <Link isExternal href="https://open.spotify.com/track/5RScucFoUuNzhLWwGWy05b">
              Name of song that gets truncates if too long
            </Link>
          </Text>
          <Text fontSize="xs" isTruncated pl="3">
            <Link isExternal href="https://open.spotify.com/artist/0SfsnGyD8FpIN4U4WCkBZ5" variant="secondary">
              Artist name
            </Link>
          </Text>
        </Box>
      </Flex>
      <Box position="absolute" className="vb-room-join">
        <Badge colorScheme="gray" variant="solid" borderRadius="lg" px="2" py="1">
          Click to join
        </Badge>
      </Box>
    </Box>
  );
};
