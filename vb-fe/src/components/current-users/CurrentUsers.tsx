import React, { FunctionComponent } from "react";

import { Avatar, Box, Heading, Wrap, WrapItem, Text, Flex } from "@chakra-ui/react";
import { User } from "util/User";

interface Props {
  users: User[];
}

export const CurrentUsers: FunctionComponent<Props> = ({ users }): JSX.Element => {
  return (
    <Box bg="dark" height="100%" position="relative" borderRadius="lg" overflow="hidden">
      <Heading size="sm" p="6">
        Current Users
      </Heading>
      <Box top="50px" position="absolute" w="100%" p="6" left="0" right="0" bottom="0" overflowY="auto">
        <Wrap spacing="12px">
          {users.map((user) => (
            <WrapItem m="2" key={user._id}>
              <Flex flexDir="column" textAlign="center">
                <Avatar src={user.image} border="3px solid teal" />
                <Text fontSize="xs" pt="2">
                  {user.username}
                </Text>
              </Flex>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Box>
  );
};
