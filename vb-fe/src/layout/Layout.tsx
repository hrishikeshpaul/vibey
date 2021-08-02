import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";

import { MIN_SHEET_HEIGHT } from "util/Variables";

interface GenericLayoutProps {
  children?: ReactElement | ReactElement[];
  className?: string;
  flex?: string;
  show?: boolean;
}

interface LayoutWrapperProps extends Omit<GenericLayoutProps, "children"> {
  children?:
    | ReactElement<typeof LayoutHeader | typeof LayoutBody | typeof LayoutFooterOverlay | typeof LayoutFooter>
    | Array<ReactElement<typeof LayoutHeader | typeof LayoutBody | typeof LayoutFooterOverlay | typeof LayoutFooter>>;
}

interface LayoutBodyProps extends Omit<GenericLayoutProps, "children"> {
  children?:
    | ReactElement<typeof LayoutSidebar | typeof LayoutContent>
    | Array<ReactElement<typeof LayoutSidebar | typeof LayoutContent>>;
}

/**
 * This is the overlay that occurs when the footer is expanded (basically when the room details are open in this case)
 * The body should have overflow hidden because you don't want to scroll on the main page
 * when the footer is expanded.
 * Conversely, the overflow should be enabled when the component is destroyed/unmouned;
 *
 */
export const LayoutFooterOverlay: FunctionComponent<GenericLayoutProps> = (): JSX.Element => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  });

  return (
    <Box
      h="100vh"
      w="100vw"
      bgColor="blackAlpha.700"
      position="fixed"
      top="0"
      left="0"
      zIndex="998"
      overflowY="hidden"
    />
  );
};

/**
 * This is the footer component which is sticky at the bottom. This will house the player
 * The footer will also be expanded so that it can reveal the room details and the people
 * that are in the room and the other information that has been discussed in the spec.
 */
export const LayoutFooter: FunctionComponent<GenericLayoutProps> = ({ show = true, children, className }) => {
  return (
    <Box
      display={show ? "block" : "none"}
      position="sticky"
      minH={MIN_SHEET_HEIGHT}
      bottom="0"
      w="100%"
      className={`container ${className}`}
      id="vb-footer"
      zIndex="999"
      transition="all 0.5s east-in-out"
    >
      {children}
    </Box>
  );
};

/**
 * This content is scroll-able and will have the different room cards
 */
export const LayoutContent: FunctionComponent<GenericLayoutProps> = ({ children, flex = "0.5" }): JSX.Element => {
  return (
    <Box mx={10} flex={flex}>
      {children}
    </Box>
  );
};

/**
 * This is the sidebar component that will be sticky on the left/right side and will have
 * width based on the flex value.
 * The Y position of the sidebar depends on the height of the header which is dynamically calculated here.
 */
export const LayoutSidebar: FunctionComponent<GenericLayoutProps> = ({ children, flex = "0.25" }): JSX.Element => {
  const [topPosition, setTopPosition] = useState<number>(0); // randomly set initial value

  useEffect(() => {
    const header: HTMLElement | null = document.getElementById("vb-header");
    const headerHeight: number = header!.clientHeight;
    setTopPosition(headerHeight);
  }, []);

  return (
    <Box
      position="sticky"
      top={`${topPosition}px`}
      flex={flex}
      height="fit-content"
      display={{ xl: "block", base: "none" }}
    >
      {children}
    </Box>
  );
};

/**
 * This is a the wrapper for the sidebars and the body
 */
export const LayoutBody: FunctionComponent<LayoutBodyProps> = ({ children, className }): JSX.Element => {
  return (
    <Box className={`container ${className}`}>
      <Flex>{children}</Flex>
    </Box>
  );
};

/**
 * Top sticky header. Multiple elements (such as teh navbar and the page title/search bar) can be
 * a part of this header.
 */
export const LayoutHeader: FunctionComponent<GenericLayoutProps> = ({ children, className }): JSX.Element => {
  return (
    <Box width="100%" position="sticky" top="0" zIndex="997" className={`container ${className}`} id="vb-header">
      {children}
    </Box>
  );
};

/**
 * A wrapper component to wrap the Header, Body and Footer components
 */
export const LayoutWrapper: FunctionComponent<LayoutWrapperProps> = ({ children }): JSX.Element => {
  return (
    <Flex flexDir="column" alignItems="center">
      {children}
    </Flex>
  );
};

export const Layout = {
  Wrapper: LayoutWrapper,
  Header: LayoutHeader,
  Body: LayoutBody,
  Content: LayoutContent,
  Sidebar: LayoutSidebar,
  Footer: LayoutFooter,
  Overlay: LayoutFooterOverlay,
};
