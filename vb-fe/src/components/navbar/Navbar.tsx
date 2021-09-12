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
  useBreakpointValue,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { CgMenuMotion } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { useHistory } from "react-router-dom";

import { ReactComponent as Headphones } from "assets/icons/headphones.svg";
import { ReactComponent as Plus } from "assets/icons/plus.svg";
import { ReactComponent as Close } from "assets/icons/cross.svg";
import { SystemConstants } from "_store/system/SystemTypes";
import { onLogout } from "_store/user/UserActions";

import { BASE_NAV_LINKS } from "util/Navbar";
import "components/navbar/Navbar.scss";

export interface Props {
  isAuth: boolean;
  profileData?: any;
  isHost?: boolean;
  isInRoom?: boolean;
}

export const Navbar: FunctionComponent<Props> = ({ isAuth, isInRoom, isHost }): JSX.Element => {
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

  const CloseIcon = (): JSX.Element => {
    return (
      <Icon color="gray.800" boxSize={4}>
        <Close />
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
            <Text pl="2">Start Listening</Text>
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
        type: SystemConstants.SET_ROOM_MODAL,
        payload: {
          isOpen: true,
          type: SystemConstants.CREATE,
        },
      });
    };

    const NavbarButtons = (): JSX.Element => {
      const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
      if (isHost) {
        return (
          <Button colorScheme="red" bgColor="red.400" leftIcon={<CloseIcon />} type="button" size={buttonSize}>
            <Text pl="2">Close Room</Text>
          </Button>
        );
      }

      if (isInRoom && !isHost) {
        return (
          <Button
            colorScheme="orange"
            leftIcon={<BiLogOut />}
            type="button"
            onClick={onCreateRoomOpen}
            size={buttonSize}
          >
            <Text pl="2">Leave Room</Text>
          </Button>
        );
      }

      return (
        <Button
          colorScheme="primary"
          leftIcon={<PlusIcon />}
          type="button"
          onClick={onCreateRoomOpen}
          size={buttonSize}
        >
          <Text pl="2">Create Room</Text>
        </Button>
      );
    };

    return (
      <>
        <Box>
          <NavbarButtons />
        </Box>
        <Menu>
          <MenuButton as={IconButton} fontSize="3xl" icon={<CgMenuMotion />} aria-label="Menu" className="bg-dark" />
          <MenuList>
            <MenuItem>About</MenuItem>
            <MenuItem>Contact Us</MenuItem>
            <MenuItem onClick={() => history.push("/room")}>Terms & Conditions</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => dispatch(onLogout())}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  };

  return (
    <div>
      <Box width="100%" py={4} bgColor="primaryDark">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md" fontFamily="'Playfair Display', serif">
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
