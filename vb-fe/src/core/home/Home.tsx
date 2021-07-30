import React, { FunctionComponent } from "react";

import { useSelector } from "react-redux";
import { Heading } from "@chakra-ui/react";

import { Navbar, Sheet } from "components";
import {
  LayoutSidebar,
  LayoutContent,
  LayoutHeader,
  LayoutBody,
  LayoutWrapper,
  LayoutFooter,
  LayoutFooterOverlay,
} from "layout/Layout";
import { State } from "_store/rootReducer";

import "core/home/Home.scss";

interface Props {
  y?: boolean;
}

export const Home: FunctionComponent<Props> = () => {
  const userData = useSelector((state: State) => state.user.user);
  const { bottomSheetExpanded } = useSelector((state: State) => state.system);

  const data = [];
  for (let i = 0; i < 100; i += 1) {
    data.push(i.toString());
  }

  return (
    <>
      <LayoutWrapper>
        {bottomSheetExpanded ? <LayoutFooterOverlay /> : <></>}
        <LayoutHeader>
          <Navbar isAuth profileData={{ ...userData }} />
          <Heading className="pt-4 w-100 pb-5" bg="gray.900" size="3xl">
            Home
          </Heading>
        </LayoutHeader>
        <LayoutBody>
          <LayoutSidebar>
            <Heading size="md">Left Sidebar</Heading>
            <div>Filters and search go here</div>
          </LayoutSidebar>
          <LayoutContent>
            <div>
              The numbers here show a long scrolling div of room cards
              {data.map((i) => (
                <div>{i}</div>
              ))}
            </div>
          </LayoutContent>
          <LayoutSidebar>
            <Heading size="md">Right Sidebar</Heading>
            <div>Trending and other widgets can go here</div>
          </LayoutSidebar>
        </LayoutBody>
        <LayoutFooter>
          <Sheet />
          {/* <Box
            bgColor="gray.700"
            h="100%"
            height={`${height}px`}
            borderTopLeftRadius="xl"
            borderTopRightRadius="xl"
            mt={10}
            maxH="500px"
            transition="height 0.5s ease-in-out"
            overflowY="auto"
          >
            <button type="button" onClick={toggleHeight} className="btn btn-primary">
              Up
            </button>
            <Box height="800px" bg="teal.200">
              Box values
            </Box>
          </Box> */}
        </LayoutFooter>
      </LayoutWrapper>
    </>
  );
};
