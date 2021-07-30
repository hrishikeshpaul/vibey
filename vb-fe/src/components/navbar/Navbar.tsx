import React, { FunctionComponent } from "react";

import {
  Text,
  Button,
  Icon,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { CgMenuMotion } from "react-icons/cg";

import { ReactComponent as Headphones } from "assets/icons/headphones.svg";
import { ReactComponent as Plus } from "assets/icons/plus.svg";
import { BASE_NAV_LINKS } from "util/Navbar";

import "components/navbar/Navbar.scss";
import { useDispatch } from "react-redux";
import { SystemConstants } from "_store/system/SystemTypes";

export interface Props {
  isAuth: boolean;
  profileData?: any;
}

export const Navbar: FunctionComponent<Props> = ({ isAuth }): JSX.Element => {
  const HeadphonesIcon = (): JSX.Element => {
    return (
      <Icon color="gray.700" boxSize={6}>
        <Headphones />
      </Icon>
    );
  };

  const PlusIcon = (): JSX.Element => {
    return (
      <Icon color="gray.900" boxSize={4}>
        <Plus />
      </Icon>
    );
  };

  const UnauthenticatedNavbar = (): JSX.Element => {
    return (
      <>
        {BASE_NAV_LINKS.map((link: any) => (
          <Text fontWeight="bold" _hover={{ color: "teal", cursor: "pointer" }} key={link.name}>
            {link.name}
          </Text>
        ))}
        <Box display={{ base: "none", md: "block" }}>
          <Button colorScheme="teal" leftIcon={<HeadphonesIcon />} type="button">
            <Text>Start Listening</Text>
          </Button>
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton colorScheme="teal" icon={<HeadphonesIcon />} type="button" aria-label="icon" />
        </Box>
      </>
    );
  };

  const AuthenticatedNavbar = (): JSX.Element => {
    const dispatch = useDispatch();

    const onCreateRoomOpen = () => {
      dispatch({
        type: SystemConstants.CREATE_ROOM_MODAL,
        payload: true,
      });
    };

    return (
      <>
        <Box display={{ base: "none", md: "block" }}>
          <Button colorScheme="teal" leftIcon={<PlusIcon />} type="button" onClick={onCreateRoomOpen}>
            <Text>Create Room</Text>
          </Button>
        </Box>
        <Box display={{ base: "block", md: "none" }} onClick={onCreateRoomOpen}>
          <IconButton colorScheme="teal" icon={<PlusIcon />} type="button" aria-label="icon" />
        </Box>

        <Menu>
          <MenuButton as={IconButton} fontSize="3xl" icon={<CgMenuMotion />} aria-label="Menu" className="bg-dark" />
          <MenuList>
            <MenuItem>About</MenuItem>
            <MenuItem>Contact Us</MenuItem>
            <MenuItem>Terms & Conditions</MenuItem>
            <MenuDivider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  };

  return (
    <div>
      <Box width="100%" py={4} bgColor="gray.900">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md">vibey</Heading>
          <HStack spacing={6}>{isAuth ? <AuthenticatedNavbar /> : <UnauthenticatedNavbar />}</HStack>
        </Flex>
      </Box>
    </div>
  );
};

Navbar.defaultProps = {
  isAuth: false,
};