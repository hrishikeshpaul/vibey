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
import { onLogout } from "_store/user/UserActions";
import { useHistory } from "react-router-dom";

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
      <Icon color="primaryDark" boxSize={4}>
        <Plus />
      </Icon>
    );
  };

  const UnauthenticatedNavbar = (): JSX.Element => {
    return (
      <>
        {BASE_NAV_LINKS.map((link: any) => (
          <Text fontWeight="bold" _hover={{ color: "primary", cursor: "pointer" }} key={link.name}>
            {link.name}
          </Text>
        ))}
        <Box display={{ base: "none", md: "block" }}>
          <Button colorScheme="primary" leftIcon={<HeadphonesIcon />} type="button">
            <Text>Start Listening</Text>
          </Button>
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton colorScheme="primary" icon={<HeadphonesIcon />} type="button" aria-label="icon" />
        </Box>
      </>
    );
  };

  const AuthenticatedNavbar = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onCreateRoomOpen = () => {
      dispatch({
        type: SystemConstants.CREATE_ROOM_MODAL,
        payload: true,
      });
    };

    return (
      <>
        <Box display={{ base: "none", md: "block" }}>
          <Button colorScheme="primary" leftIcon={<PlusIcon />} type="button" onClick={onCreateRoomOpen}>
            <Text>Create Room</Text>
          </Button>
        </Box>
        <Box display={{ base: "block", md: "none" }} onClick={onCreateRoomOpen}>
          <IconButton colorScheme="primary" icon={<PlusIcon />} type="button" aria-label="icon" />
        </Box>

        <Menu>
          <MenuButton as={IconButton} fontSize="3xl" icon={<CgMenuMotion />} aria-label="Menu" className="bg-dark" />
          <MenuList>
            <MenuItem>About</MenuItem>
            <MenuItem>Contact Us</MenuItem>
            <MenuItem onClick={() => history.push("/room")}>Terms & Conditions</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => dispatch(onLogout(history))}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  };

  return (
    <div>
      <Box width="100%" py={4} bgColor="primaryDark">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md" fontFamily="'Playfair Display', serif" textColor="teal.50">
            vibey
          </Heading>
          <HStack spacing={6}>{isAuth ? <AuthenticatedNavbar /> : <UnauthenticatedNavbar />}</HStack>
        </Flex>
      </Box>
    </div>
  );
};

Navbar.defaultProps = {
  isAuth: false,
};
