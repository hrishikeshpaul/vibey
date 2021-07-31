import React from "react";

import { useDispatch } from "react-redux";

import { LayoutWrapper, LayoutContent, LayoutBody, LayoutHeader } from "layout/Layout";

import { getLoginRedirect } from "_store/user/UserActions";
import { ReactComponent as Spotify } from "assets/icons/spotify.svg";
import { Icon, Heading, Text, Button } from "@chakra-ui/react";

import "./Landing.scss";
import { Navbar } from "components";

export const Landing = () => {
  const dispatch = useDispatch();

  /**
   * Calls an action to redirect to the Spotify Login
   */
  const handleSignIn = async (): Promise<void> => {
    dispatch(getLoginRedirect());
  };

  const SpotifyIcon = (): JSX.Element => {
    return (
      <Icon color="black" boxSize={6}>
        <Spotify />
      </Icon>
    );
  };

  return (
    <LayoutWrapper>
      <LayoutHeader>
        <Navbar isAuth={false} />
      </LayoutHeader>
      <LayoutBody>
        <LayoutContent flex="1">
          <div className="vb-landing w-100 d-flex justify-content-center align-items-center main-body flex-column">
            <Heading size="3xl" className="text-center d-flex">
              Make listening to music more fun.
            </Heading>

            <Text className="pt-3 text-center" fontSize="xl" color="gray.400">
              vibe with people with the same taste in music.
            </Text>
            <div className="mt-5">
              <Button colorScheme="primary" leftIcon={<SpotifyIcon />} type="button" size="lg" onClick={handleSignIn}>
                <Text>Sign in via Spotify</Text>
              </Button>
            </div>
          </div>
        </LayoutContent>
      </LayoutBody>
    </LayoutWrapper>
  );
};
