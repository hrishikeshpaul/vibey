import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { Input, Button } from "@chakra-ui/react";

import { Navbar } from "components";
import { Layout } from "layout/Layout";
import { State } from "_store/rootReducer";
import { useLocation } from "react-router-dom";

export const Room = () => {
  const socket = useSelector((state: State) => state.system.socket);
  const location = useLocation();

  useEffect(() => {
    if (socket) {
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
            <Input
              variant="filled"
              onChange={(e: any) => {
                socket?.emit("message", { value: e.target.value, roomId: location.pathname.split("/")[2] });
              }}
            />
          </Layout.Content>
        </Layout.Body>
      </Layout.Wrapper>
    </>
  );
};
