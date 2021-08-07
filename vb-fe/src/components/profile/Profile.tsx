import React, { FunctionComponent } from "react";

import { Heading, Avatar, Box, Center, Flex, Text, Stack } from "@chakra-ui/react";

export interface Profile {
  displayName: string;
  image: string;
  username: string;
  href: string;
}

export interface Props {
  profile: Profile;
}

export const Profile: FunctionComponent<Props> = ({ profile }): JSX.Element => {
  return (
    <Center textAlign="center">
      <Box w="full" bg="dark" rounded="lg" overflow="hidden">
        <Box h="75px" bgColor="teal.800" />
        <Flex justify="center" mt="-9">
          <Avatar
            size="lg"
            src={profile.image}
            alt="User"
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align="center" mb={5}>
            <Heading fontSize="md" fontWeight="500">
              {profile.displayName}
            </Heading>
            <Text color="gray.500">{profile.username}</Text>
          </Stack>

          <Stack direction="row" justify="center" spacing={10}>
            <Stack spacing={0} align="center">
              <Text fontWeight={600}>98</Text>
              <Text fontSize="sm" color="gray.500">
                Likes
              </Text>
            </Stack>

            <Stack spacing={0} align="center">
              <Text fontWeight={600}>6</Text>
              <Text fontSize="sm" color="gray.500">
                Rooms
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
};
