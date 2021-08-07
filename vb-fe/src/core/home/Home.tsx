import React, { FunctionComponent, useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { Flex, VStack } from "@chakra-ui/react";
import socketIOClient from "socket.io-client";

import { Navbar, Sheet, Profile, Search, Filters, Card } from "components";
import { Layout } from "layout/Layout";
import { State } from "_store/rootReducer";

import "core/home/Home.scss";

const SOCKET_ENDPOINT = "http://localhost:8080/rooms";

/**
 * The prop type is a placeholder
 */
export const Home: FunctionComponent<any> = () => {
  const userData = useSelector((state: State) => state.user.user);
  const { bottomSheetExpanded } = useSelector((state: State) => state.system);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(SOCKET_ENDPOINT);
    socket.on("connect", () => {
      console.log("Socket connected!");
      socket.emit("join-room", { test: "test" });
    });
  }, []);

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
        {/* <Layout.Footer>
          <Sheet />
        </Layout.Footer> */}
      </Layout.Wrapper>
    </>
  );
};
