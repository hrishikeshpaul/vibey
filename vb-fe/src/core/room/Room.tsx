import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { Flex, VStack } from "@chakra-ui/react";

import { Navbar } from "components";
import { Layout } from "layout/Layout";
import { State } from "_store/rootReducer";
import { useLocation } from "react-router-dom";

export const Room = () => {
  const socket = useSelector((state: State) => state.system.socket);
  const location = useLocation();

  useEffect(() => {
    console.log("here");
    if (socket) {
      console.log(socket);
      const roomId = location.pathname.split("/")[2];
      if (roomId) {
        socket?.emit("join-room", roomId);
      }
    }
  }, [socket]); //eslint-disable-line

  return (
    <>
      <Layout.Wrapper>
        <Layout.Header>
          <Navbar isAuth />
        </Layout.Header>
        <Layout.Body>
          <Layout.Content flex="1">
            <span>this is room</span>
          </Layout.Content>
        </Layout.Body>
      </Layout.Wrapper>
    </>
  );
};
