import React, { FunctionComponent } from "react";

import { useSelector } from "react-redux";
import { Flex, Heading } from "@chakra-ui/react";

import { Navbar, Sheet, Profile, Search, Filters } from "components";
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

/**
 * The prop type is a placeholder
 */
export const Home: FunctionComponent<any> = () => {
  const userData = useSelector((state: State) => state.user.user);
  const { bottomSheetExpanded } = useSelector((state: State) => state.system);

  const profile = JSON.parse(localStorage.getItem("v-user") || "");
  profile.displayName = profile.display_name;

  const data = [];
  for (let i = 0; i < 100; i += 1) {
    data.push(i.toString());
  }

  const onSearch = (str: string): void => {
    console.log("Search value: ", str);
  };

  return (
    <>
      <LayoutWrapper>
        {bottomSheetExpanded ? <LayoutFooterOverlay /> : <></>}
        <LayoutHeader>
          <Navbar isAuth profileData={{ ...userData }} />
          <Flex justifyContent="space-between" alignItems="center" bg="primaryDark" pt="6" pb="12">
            <Heading w="100%" size="2xl">
              Home
            </Heading>
            <Search onChange={onSearch} />
          </Flex>
        </LayoutHeader>
        <LayoutBody>
          <LayoutSidebar flex="0.25">
            <Filters />
          </LayoutSidebar>
          <LayoutContent flex="0.55">
            <div>
              The numbers here show a long scrolling div of room cards
              {data.map((i) => (
                <div key={i}>{i}</div>
              ))}
            </div>
          </LayoutContent>
          <LayoutSidebar flex="0.2">
            <Profile profile={profile} />
          </LayoutSidebar>
        </LayoutBody>
        <LayoutFooter>
          <Sheet />
        </LayoutFooter>
      </LayoutWrapper>
    </>
  );
};
