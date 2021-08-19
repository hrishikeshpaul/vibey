import React, { FunctionComponent } from "react";

import { Flex, VStack, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { State } from "_store/rootReducer";
import { Navbar, Profile, Search, Filters, Card, Player } from "components";
import { Layout } from "layout/Layout";

import "core/home/Home.scss";

/**
 * The prop type is a placeholder
 */
export const Home: FunctionComponent = () => {
  const userData = useSelector((state: State) => state.user.user);
  const { bottomSheetExpanded } = useSelector((state: State) => state.system);

  const profile = JSON.parse(localStorage.getItem("v-user") || "");

  const data = [];
  for (let i = 0; i < 10; i += 1) {
    data.push(<Card key={i} />);
  }

  const onSearch = (str: string): void => {
    console.log("Search value: ", str);
  };

  return (
    <>
      <Layout.Wrapper>
        {bottomSheetExpanded ? <Layout.Overlay /> : <></>}
        <Layout.Header>
          <Navbar isAuth profileData={{ ...userData }} />
          <Flex justifyContent="space-between" alignItems="center" bg="primaryDark" pt="6" pb="12">
            <Search onChange={onSearch} />
          </Flex>
        </Layout.Header>
        <Layout.Body>
          <Layout.Sidebar flex="0.25">
            <Filters />
          </Layout.Sidebar>
          <Layout.Content flex="0.55">
            <VStack spacing="8">{data.map((i) => i)}</VStack>
          </Layout.Content>
          <Layout.Sidebar flex="0.2">
            <Profile profile={profile} />
          </Layout.Sidebar>
        </Layout.Body>
        <Layout.Footer>
          <Box bg="gray.800" borderTopRightRadius="lg" borderTopLeftRadius="lg">
            <Player />
          </Box>
        </Layout.Footer>
      </Layout.Wrapper>
    </>
  );
};
