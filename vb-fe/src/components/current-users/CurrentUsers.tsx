import React, { FunctionComponent } from "react";

import { Avatar, Box, Heading, Wrap, WrapItem, Text, Flex } from "@chakra-ui/react";
import { User } from "util/User";

interface Props {
  users: User[];
  host: User;
}

export const CurrentUsers: FunctionComponent<Props> = ({ users, host }): JSX.Element => {
  return (
    <>
      {users && users.length > 0 ? (
        <Box bg="gray.800" height="100%" position="relative" borderRadius="lg" overflow="hidden">
          <Heading size="sm" p="6">
            Current Users
          </Heading>
          <Box top="50px" position="absolute" w="100%" p="6" left="0" right="0" bottom="0" overflowY="auto">
            <Wrap spacing="12px">
              {users.map((user) => (
                <WrapItem m="2" key={user._id}>
                  <Flex flexDir="column" textAlign="center">
                    <Avatar src={user.image} border={host._id === user._id ? "3px solid teal" : ""} />
                    <Text fontSize="xs" pt="2">
                      {user.username}
                    </Text>
                  </Flex>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Box>
      ) : (
        <Text>No users currently in room.</Text>
      )}
    </>
  );
};
