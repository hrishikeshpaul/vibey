import React, { FunctionComponent, useEffect, useState } from "react";

import { Flex, VStack, Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { State } from "_store/rootReducer";
import { Navbar, Profile, Search, Filters, Card, Player } from "components";
import { Layout } from "layout/Layout";

import "core/home/Home.scss";
import { Room } from "util/Room";
import { getAllRoomsAction } from "_store/room/RoomActions";
import { usePagination } from "util/Input";

/**
 * The prop type is a placeholder
 */
export const Home: FunctionComponent = () => {
  const userData = useSelector((state: State) => state.user.user);
  const { httpConnected } = useSelector((state: State) => state.system);
  const { bottomSheetExpanded } = useSelector((state: State) => state.system);
  const { roomsList, offsetLimit } = useSelector((state: State) => state.room);
  const dispatch = useDispatch();

  const profile = JSON.parse(localStorage.getItem("v-user") || "");

  const onSearch = (str: string): void => {
    console.log("Search value: ", str);
  };

  useEffect(() => {
    if (httpConnected) {
      dispatch(getAllRoomsAction(offsetLimit.offset, offsetLimit.limit));
    }
  }, [dispatch, httpConnected]); // eslint-disable-line

  usePagination(() => {
    dispatch(getAllRoomsAction(offsetLimit.offset, offsetLimit.limit));
  });

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
            <VStack spacing="8">
              {roomsList.map((room: Room) => (
                <Card room={room} key={room._id} />
              ))}
            </VStack>
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
