import React, { useEffect, ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "@chakra-ui/react";

import { emit, subscribeTo } from "services/Socket";
import { Navbar } from "components";
import { Layout } from "layout/Layout";

export const Room = (): ReactElement => {
  const location = useLocation();

  useEffect(() => {
    const roomId = location.pathname.split("/")[2];
    if (roomId) {
      emit.joinRoom(roomId);
      subscribeTo.joinSuccess((data) => console.log("here, ", data));
    }
  }, [location.pathname]);

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
                emit.message({ message: e.target.value, roomId: location.pathname.split("/")[2] });
              }}
            />
          </Layout.Content>
        </Layout.Body>
      </Layout.Wrapper>
    </>
  );
};
